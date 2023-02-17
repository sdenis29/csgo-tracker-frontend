import Head from 'next/head'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const frequencies = [
  { value: 'monthly', label: 'Lunar', priceSuffix: '/luna' },
  { value: 'annually', label: 'Trimestrial', priceSuffix: '/trimestru' },
]
const tiers = [
  {
    name: 'VIP Starter',
    id: 'tier-starter',
    href: '#',
    price: { monthly: '5€', annually: '10€' },
    description: 'The essentials to provide your best work for clients.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    mostPopular: false,
  },
  {
    name: 'VIP Pro',
    id: 'tier-pro',
    href: '#',
    price: { monthly: '7€', annually: '15€' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    mostPopular: true,
  },
  {
    name: 'VIP Titan',
    id: 'tier-titan',
    href: '#',
    price: { monthly: '10€', annually: '20€' },
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools',
    ],
    mostPopular: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function VIP() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <>
      <Head>
        <title>CSGO-TRACKER - VIP</title>
        <meta name="description" content="VIP" />
      </Head>
      <div className="">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-cyan-600 sm:text-5xl">
              Iti oferim cele mai avantajoase oferte!
            </p>
          </div>
          <div className="flex justify-center">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="bg-white grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
            >
              <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
              {frequencies.map((option) => (
                <RadioGroup.Option
                  key={option.value}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      checked ? 'bg-cyan-600 text-white' : 'text-gray-500',
                      'cursor-pointer rounded-full py-1 px-2.5'
                    )
                  }
                >
                  <span>{option.label}</span>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? 'ring-4 ring-cyan-600 bg-white' : 'ring-2 ring-gray-200 bg-white',
                  'rounded-3xl p-8 xl:p-10'
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? 'text-cyan-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-cyan-600/10 py-1 px-2.5 text-xs font-semibold leading-5 text-cyan-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency.value]}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">{frequency.priceSuffix}</span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-gray-50 hover:bg-white hover:ring-cyan-300'
                      : ' ring-gray-200',
                    'mt-6 block rounded-md py-2 px-3 text-center text-sm leading-6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  Cumpara
                </a>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-cyan-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
