import type { Metadata } from 'next'
import Link from 'next/link'

const pricingGroups = [
  {
    title: 'Personal Websites',
    accent: 'text-emerald-500',
    summary: 'Great for portfolios, personal brands, and a simple online presence.',
    plans: [
      {
        name: 'Basic',
        price: '$300 AUD',
        features: ['1 page', 'Simple design', 'Mobile-friendly', 'Code provided'],
      },
      {
        name: 'Pro',
        price: '$450 AUD',
        intro: 'Everything in Basic, plus:',
        features: ['2-3 pages', 'Contact form', 'Improved design'],
        badge: 'Most Popular',
      },
      {
        name: 'Premium',
        price: '$600 AUD',
        intro: 'Everything in Pro, plus:',
        features: ['3-4 pages', 'Basic SEO', 'Faster performance'],
      },
    ],
  },
  {
    title: 'Business Websites',
    accent: 'text-sky-500',
    summary: 'Built for businesses that need stronger structure, credibility, and conversion.',
    plans: [
      {
        name: 'Basic',
        price: '$800 AUD',
        features: ['4-5 pages', 'Custom design', 'Mobile optimisation', 'Code provided'],
      },
      {
        name: 'Pro',
        price: '$1,200 AUD',
        intro: 'Everything in Basic, plus:',
        features: ['5-8 pages', 'Basic SEO', 'Contact forms', 'Revisions'],
        badge: 'Best Value',
      },
      {
        name: 'Custom',
        price: 'From $1,800+ AUD',
        intro: 'Everything in Pro, plus:',
        features: ['Advanced features (blog, booking, etc.)', 'Performance optimisation', 'Tailored design'],
      },
    ],
  },
]

const extras = [
  'Extra pages: $50-$100/page',
  'Design changes after approval: $50-$200',
  'Fast delivery: $100-$300',
  'Deployment help: $100-$300',
  'Ongoing support: $20-$50/month',
]

const notes = [
  'Full website code is provided',
  'Hosting and deployment handled by client',
  'Prices may vary depending on complexity',
]

export const metadata: Metadata = {
  title: 'Website Pricing | Aaryan Patel',
  description: 'Website pricing for personal and business websites by Aaryan Patel, including package tiers, extras, and custom options.',
  keywords: [
    'Website pricing',
    'Web design pricing',
    'Business website cost',
    'Personal website pricing',
    'Aaryan Patel pricing',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://aaryanjpatel.github.io' }],
  alternates: { canonical: 'https://aaryanjpatel.github.io/pricing' },
  openGraph: {
    title: 'Website Pricing | Aaryan Patel',
    description: 'Pricing packages for personal and business websites.',
    url: 'https://aaryanjpatel.github.io/pricing',
    siteName: 'Aaryan Patel',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Website Pricing | Aaryan Patel',
    description: 'Pricing packages for personal and business websites.',
    creator: '@AaryanPatel',
  },
  robots: { index: true, follow: true },
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Pricing</span>
      </div>

      <div className="mb-10 max-w-4xl">
        <p className="mb-1 font-mono text-sm text-primary">{`>`} pricing</p>
        <h1 className="text-3xl font-extrabold tracking-tight">Website Pricing</h1>
        <hr className="mb-6 mt-2 border-border" />
        <p className="text-base leading-relaxed text-muted-foreground">
          Clear starting prices for personal and business websites, with room for extra features, faster delivery,
          and tailored project scopes when needed.
        </p>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Starting From</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight">$300 AUD</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Entry pricing for personal websites with a clean one-page setup.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Business Range</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight">$800-$1,800+</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Flexible packages for business sites, service pages, and custom builds.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">What&apos;s Included</p>
          <p className="mt-3 text-xl font-bold tracking-tight">Code Provided</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            You receive the finished website code, while hosting and deployment stay in your control.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {pricingGroups.map((group) => (
          <section key={group.title}>
            <div className="mb-5">
              <h2 className={`text-2xl font-bold tracking-tight ${group.accent}`}>{group.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{group.summary}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {group.plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-2xl border p-6 shadow-sm transition-colors hover:border-primary/50 ${
                    plan.badge ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                      <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{plan.price}</h3>
                    </div>
                    {plan.badge && (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  {plan.intro && <p className="mb-3 text-sm font-medium text-muted-foreground">{plan.intro}</p>}
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="leading-relaxed">
                        - {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">Extras</h2>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            These add-ons can be included if your project needs more content, faster turnaround, or continued help.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {extras.map((item) => (
              <li key={item} className="leading-relaxed">
                - {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">Important</h2>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Final pricing depends on your content, features, and overall project complexity.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {notes.map((item) => (
              <li key={item} className="leading-relaxed">
                - {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/blog/how-to-purchase-a-website"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            How to Buy a Website
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Contact Me
          </Link>
          <Link
            href="/business"
            className="inline-flex items-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Back to My Business
          </Link>
        </div>
      </div>
    </div>
  )
}
