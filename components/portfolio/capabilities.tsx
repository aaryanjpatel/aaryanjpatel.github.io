const capabilities = [
{
  title: 'AI & Machine Learning',
  description:
    'Exploring how computers can learn from data and make predictions. Building simple AI projects and learning how models work in real-world applications.',
  icon: '🧠',
},
{
  title: 'Data & Projects',
  description:
    'Working with data to create small projects, understand patterns, and improve problem-solving skills through coding and logical thinking.',
  icon: '⚡',
},
{
  title: 'Cloud & Technology',
  description:
    'Learning how modern apps and websites run on cloud platforms and exploring tools used to build and deploy projects online.',
  icon: '☁️',
},
{
  title: 'Coding & Development',
  description:
    'Practicing programming and building projects step by step, focusing on writing clean code and improving development skills.',
  icon: '🔁',
},
{
  title: 'Digital Safety',
  description:
    'Understanding the importance of online safety, protecting data, and following good practices when working with technology.',
  icon: '🔐',
},
{
  title: 'Building & Creating',
  description:
    'Creating fun and useful projects, learning how to turn ideas into real applications, and exploring how technology can solve problems.',
  icon: '⚙️',
}
]

export function Capabilities() {
  return (
    <section id="capabilities" className="py-14 mx-auto max-w-4xl px-6">
      <div className="mb-10">
        <p className="font-mono text-sm text-primary mb-1">{'>'} expertise</p>
        <h2 className="text-3xl font-extrabold tracking-tight gradient-heading">Capabilities</h2>
      </div>
      <hr className="border-border mb-10" />
      <div className="grid sm:grid-cols-2 gap-6">
        {capabilities.map((cap) => (
          <div
            key={cap.title}
            className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{cap.icon}</span>
              <h3 className="font-semibold text-base leading-snug">{cap.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
