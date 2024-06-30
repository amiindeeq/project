import Stripe from 'stripe'
import { Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/Client'

const router = Router()
const prisma = new PrismaClient()

// stripe.js
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { product } = req.body
    const lineItems: any = []

    product.data?.map((product: any) => {
      product.Items.map((item: any) => {
        const quantity = +item.Quant
        const price = parseInt(item.Product.Pr_Price)
        const name = item.Product.Pr_Name
        const image = item.Product.Pr_Image.split(',')[0]

        if (isNaN(price) || isNaN(quantity)) {
          throw new Error('Invalid price or quantity')
        }

        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
              images: [image.split(',')[0]],
            },
            unit_amount: price * 100,
          },
          quantity: quantity,
        })
      })
    })

    // Subtract Quant product
    const updateProducts = async (product: any) => {
      let proId = parseInt(
        product.data?.map((product: any) =>
          product.Items.map((items: any) => items.Product.Pr_Id)
        )
      )
    
      let Pr_Quantity = product.data?.map((product: any) =>
        product.Items.map((items: any) => items.Product?.Pr_Quantity)
      )
      let quant = product.data?.map((product: any) =>
        product.Items.map((items: any) => items?.Quant)
      )
    
      Pr_Quantity = parseFloat(Pr_Quantity[0][0]);
      quant = parseFloat(quant[0][0]);
    
      if (!isNaN(Pr_Quantity) && !isNaN(quant)) {
        const netQuant = Pr_Quantity - quant
        await prisma.product.update({
          where: {
            Pr_Id: proId,
          },
          data: {
            Pr_Quantity: netQuant,
          },
        })
        console.log(`Product ${proId} updated successfully.`)
      } else {
        console.warn(
          `Skipping update for product ${proId}: Invalid quantity values.`
        )
      }
    }
    
    updateProducts(product)
      .then(() => console.log('Product updated successfully'))
      .catch((error) => console.error('Error updating product:', error))
    

    // Order Status
    const orderIds = product.data?.map((product: any) => product.Or_Id)

    if (orderIds) {
      for (const orderId of orderIds) {
        await prisma.order.update({
          where: {
            Or_Id: orderId,
          },
          data: {
            isPaid: true,
          },
        })
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    })

    res.json({ url: session.url, productId: session.id })
  } catch (error) {
    console.error(error)
  }
})

export default router
