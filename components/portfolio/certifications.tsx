import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Award, ArrowRight } from 'lucide-react'
import certsData from '@/public/metadata/certifications.json'

type Cert = {
  name: string
  issuer: string
  image?: string
  issuerLogo: string
  issued: string
  expires: string
  credentialId: string
  credentialUrl: string
  category: string
  blogSlug?: string
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  if (!month) return year
  const d = new Date(Number(year), Number(month) - 1)
  return d.toLocaleDateString('en-AU', { year: 'numeric', month: 'short' })
}

function groupByCategory(certs: Cert[]) {
  return certs.reduce<Record<string, Cert[]>>((acc, cert) => {
    const cat = cert.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(cert)
    return acc
  }, {})
}

function CertCard({ cert }: { cert: Cert }) {
  const cardContent = (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all duration-200 md:flex-row md:items-center">
      <div className="shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        {cert.image ? (
          <div className="relative h-40 w-full md:h-28 md:w-44">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="rounded-lg bg-primary/10 p-4">
            <Award className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold leading-tight">{cert.name}</h3>
            <p className="mt-2 text-lg text-muted-foreground">{cert.issuer}</p>
          </div>
          <span className="w-fit shrink-0 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            {cert.category}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {cert.issued && <span>Issued {formatDate(cert.issued)}</span>}
          {cert.expires && <><span>·</span><span>Expires {formatDate(cert.expires)}</span></>}
          {cert.credentialId && <><span>·</span><span>ID: {cert.credentialId}</span></>}
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-primary">
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              Show credential <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {cert.blogSlug && (
            <div className="inline-flex items-center gap-1 font-medium">
              Read full details <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (cert.blogSlug) {
    return (
      <Link href={`/blog/${cert.blogSlug}`} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

export function CertificationsPage() {
  const groups = groupByCategory(certsData as Cert[])

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">Certifications</span>
      </div>
      <div className="mb-12">
        <p className="font-mono text-sm text-primary mb-1">{`>`} credentials</p>
        <h1 className="text-3xl font-extrabold tracking-tight gradient-heading">Licenses &amp; Certifications</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          These entries represent completed course accomplishments and learning milestones. For some of these courses, a paid certificate was available, but I chose not to purchase it, so this section highlights the work I completed and the progress I made.
        </p>
      </div>
      <div className="space-y-10">
        {Object.entries(groups).map(([category, certs]) => (
          <div key={category}>
            <h2 className="text-base font-semibold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">
              {category}
            </h2>
            <div className="grid gap-4">
              {certs.map((cert) => (
                <CertCard key={cert.name} cert={cert} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
