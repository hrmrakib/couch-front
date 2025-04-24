import Image from "next/image";
import {
  Truck,
  RefreshCw,
  Clock,
  MapPin,
  HelpCircle,
  Phone,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShippingReturnsPage() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-6xl'>
      <div className='flex flex-col items-center mb-12 text-center'>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>
          Shipping & Returns
        </h1>
        <p className='text-muted-foreground text-lg max-w-2xl'>
          Everything you need to know about our shipping process and returns
          policy for both purchased and rented couches.
        </p>
      </div>

      <Tabs defaultValue='shipping' className='w-full mb-12'>
        <TabsList className='grid w-full grid-cols-2 mb-8'>
          <TabsTrigger value='shipping'>Shipping Information</TabsTrigger>
          <TabsTrigger value='returns'>Returns & Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value='shipping' className='space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <Truck className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-semibold'>Delivery Timeframes</h3>
              </div>
              <div className='space-y-3'>
                <p>We offer several delivery options to meet your needs:</p>
                <ul className='space-y-2 list-disc pl-5'>
                  <li>
                    <span className='font-medium'>Standard Delivery:</span> 7-14
                    business days
                  </li>
                  <li>
                    <span className='font-medium'>Express Delivery:</span> 3-5
                    business days
                  </li>
                  <li>
                    <span className='font-medium'>Premium Delivery:</span> 1-2
                    business days
                  </li>
                </ul>
                <p className='text-sm text-muted-foreground'>
                  Delivery timeframes may vary based on your location and
                  product availability.
                </p>
              </div>
            </div>

            <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <MapPin className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-semibold'>Delivery Areas</h3>
              </div>
              <div className='space-y-3'>
                <p>We currently deliver to the following areas:</p>
                <ul className='space-y-2 list-disc pl-5'>
                  <li>Continental United States</li>
                  <li>Alaska and Hawaii (additional fees apply)</li>
                  <li>Canada (select provinces)</li>
                </ul>
                <p className='text-sm text-muted-foreground'>
                  For international shipping inquiries, please contact our
                  customer service team.
                </p>
              </div>
            </div>
          </div>

          <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
            <h3 className='text-xl font-semibold'>Shipping Costs</h3>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left py-3 px-4'>Delivery Type</th>
                    <th className='text-left py-3 px-4'>Purchase</th>
                    <th className='text-left py-3 px-4'>Rental</th>
                    <th className='text-left py-3 px-4'>
                      Free Shipping Threshold
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='py-3 px-4'>Standard</td>
                    <td className='py-3 px-4'>$49.99</td>
                    <td className='py-3 px-4'>$39.99</td>
                    <td className='py-3 px-4'>Orders over $999</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='py-3 px-4'>Express</td>
                    <td className='py-3 px-4'>$89.99</td>
                    <td className='py-3 px-4'>$69.99</td>
                    <td className='py-3 px-4'>Orders over $1,499</td>
                  </tr>
                  <tr>
                    <td className='py-3 px-4'>Premium</td>
                    <td className='py-3 px-4'>$129.99</td>
                    <td className='py-3 px-4'>$99.99</td>
                    <td className='py-3 px-4'>Orders over $1,999</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
            <h3 className='text-xl font-semibold'>
              White Glove Delivery Service
            </h3>
            <p>
              All our couches come with complimentary white glove delivery
              service, which includes:
            </p>
            <ul className='space-y-2 list-disc pl-5'>
              <li>Room of choice placement</li>
              <li>Unpacking and assembly</li>
              <li>Packaging removal</li>
              <li>Basic setup and positioning</li>
            </ul>
            <div className='mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md'>
              <p className='text-amber-800 text-sm'>
                <strong>Note:</strong> Our delivery team will contact you 24-48
                hours before delivery to confirm your delivery window.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='returns' className='space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <RefreshCw className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-semibold'>
                  Return Policy for Purchases
                </h3>
              </div>
              <div className='space-y-3'>
                <p>
                  We want you to love your new couch. If you&apos;re not
                  completely satisfied, we offer:
                </p>
                <ul className='space-y-2 list-disc pl-5'>
                  <li>
                    <span className='font-medium'>30-day return window</span>{" "}
                    for all purchased items
                  </li>
                  <li>Items must be in original condition</li>
                  <li>Original packaging preferred but not required</li>
                  <li>Return shipping fees may apply</li>
                </ul>
                <p className='text-sm text-muted-foreground'>
                  Custom and made-to-order couches have special return
                  conditions. Please see our full policy for details.
                </p>
              </div>
            </div>

            <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <Clock className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-xl font-semibold'>
                  Rental Return Information
                </h3>
              </div>
              <div className='space-y-3'>
                <p>For our rental items:</p>
                <ul className='space-y-2 list-disc pl-5'>
                  <li>
                    Schedule pickup at least 48 hours before rental end date
                  </li>
                  <li>Extend your rental through your account dashboard</li>
                  <li>Late returns incur daily extension fees</li>
                  <li>Damage protection plans available at checkout</li>
                </ul>
                <p className='text-sm text-muted-foreground'>
                  Excessive damage beyond normal wear and tear may result in
                  additional charges.
                </p>
              </div>
            </div>
          </div>

          <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
            <h3 className='text-xl font-semibold'>Refund Process</h3>
            <div className='space-y-4'>
              <p>
                Once we receive your returned item, our team will inspect it to
                ensure it meets our return conditions. After approval, refunds
                are processed as follows:
              </p>
              <ul className='space-y-2 list-disc pl-5'>
                <li>
                  <span className='font-medium'>Original payment method:</span>{" "}
                  3-5 business days
                </li>
                <li>
                  <span className='font-medium'>Store credit:</span> Immediately
                  available
                </li>
                <li>
                  <span className='font-medium'>Bank transfers:</span> 5-7
                  business days
                </li>
              </ul>
              <div className='mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md'>
                <p className='text-amber-800 text-sm'>
                  <strong>Tip:</strong> Choosing store credit for your refund
                  adds an extra 10% to your refund value!
                </p>
              </div>
            </div>
          </div>

          <div className='bg-muted/40 rounded-lg p-6 space-y-4'>
            <h3 className='text-xl font-semibold'>How to Initiate a Return</h3>
            <ol className='space-y-4 list-decimal pl-5'>
              <li>
                <p className='font-medium'>Log into your account</p>
                <p className='text-sm text-muted-foreground'>
                  Access your order history and select the item you wish to
                  return
                </p>
              </li>
              <li>
                <p className='font-medium'>Complete the return form</p>
                <p className='text-sm text-muted-foreground'>
                  Select your reason for return and preferred refund method
                </p>
              </li>
              <li>
                <p className='font-medium'>Schedule pickup</p>
                <p className='text-sm text-muted-foreground'>
                  Choose a convenient date for our team to collect the item
                </p>
              </li>
              <li>
                <p className='font-medium'>Prepare your item</p>
                <p className='text-sm text-muted-foreground'>
                  Ensure the couch is clean and ready for collection
                </p>
              </li>
            </ol>
            <div className='mt-6'>
              <Button>Initiate a Return</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className='space-y-6'>
        <h2 className='text-2xl font-bold'>Frequently Asked Questions</h2>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Do you offer assembly services?</AccordionTrigger>
            <AccordionContent>
              Yes, all our deliveries include complimentary white glove service
              with assembly, placement in your room of choice, and packaging
              removal.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>
              Can I change my delivery date after placing an order?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can reschedule your delivery up to 48 hours before your
              scheduled delivery window through your account dashboard or by
              contacting customer service.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>
              What if my couch arrives damaged?
            </AccordionTrigger>
            <AccordionContent>
              If your couch arrives with any damage, please note this on the
              delivery receipt and contact our customer service team within 24
              hours. We&apos;ll arrange for a replacement or repair as quickly
              as possible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-4'>
            <AccordionTrigger>How do rental returns work?</AccordionTrigger>
            <AccordionContent>
              For rental returns, simply schedule a pickup through your account
              at least 48 hours before your rental period ends. Our team will
              arrive during your selected time window to collect the couch.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-5'>
            <AccordionTrigger>Can I extend my rental period?</AccordionTrigger>
            <AccordionContent>
              Yes, you can extend your rental at any time through your account
              dashboard. Extensions are billed at your original rental rate and
              can be done on a weekly or monthly basis.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-6'>
            <AccordionTrigger>
              Do you offer expedited shipping?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer express (3-5 days) and premium (1-2 days) shipping
              options at checkout for an additional fee. Availability may depend
              on your location and the item selected.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='mt-12 bg-muted/40 rounded-lg p-8'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='space-y-4 text-center md:text-left'>
            <h3 className='text-2xl font-bold'>Need More Help?</h3>
            <p className='text-muted-foreground max-w-md'>
              Our customer service team is available 7 days a week to assist
              with any questions about shipping or returns.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
              <Button className='gap-2'>
                <Phone className='h-4 w-4' />
                Contact Support
              </Button>
            </div>
          </div>
          <div className='relative w-full max-w-sm h-48 rounded-lg overflow-hidden'>
            <Image
              src='/placeholder.svg?height=192&width=384'
              alt='Customer support'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
