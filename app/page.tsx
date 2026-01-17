import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { siteInfo } from '@/lib/info';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';

/**
 * SWISS PORTFOLIO SYSTEM
 * Structure: Strict 12-column Grid
 * Type: Inter / Helvetica
 * Philosophy: Content first, decoration zero.
 */

// Theme-aware class names using Tailwind dark mode
const themeColors = "bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white selection:bg-red-600 selection:text-white";
const subBorderColor = "border-neutral-200 dark:border-neutral-800";
const mutedText = "text-neutral-500 dark:text-neutral-400";

export default function HomePage() {
   return (
      <div className={`min-h-screen font-sans transition-colors duration-300 ${themeColors}`}>

         {/* HEADER: ENHANCED STICKY NAVBAR */}
         <Navbar />

         <main className="max-w-screen-2xl mx-auto">

            {/* HERO SECTION */}
            <section id="home" className={`grid grid-cols-12 border-b ${subBorderColor}`}>
               <div className={`col-span-12 lg:col-span-8 p-8 md:p-16 border-b lg:border-b-0 ${subBorderColor}`}>
                  <span className={`block text-xs font-mono mb-4 uppercase tracking-widest ${mutedText}`}>01 / Intro</span>
                  <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                     Full-Stack<br />Developer<span className="text-red-600">.</span>
                  </h2>
                  <p className="text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                     Passionate about building modern web experiences. I specialize in <span className="underline decoration-red-600 decoration-2 underline-offset-4">TypeScript</span>, <span className="underline decoration-red-600 decoration-2 underline-offset-4">React</span>, <span className="underline decoration-red-600 decoration-2 underline-offset-4">Next.js</span>, and <span className="underline decoration-red-600 decoration-2 underline-offset-4">Node.js</span>, transforming complex problems into sleek, efficient solutions.
                  </p>

                  <div className="mt-12">
                     <a href="/resume.pdf" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-current pb-1 hover:text-red-600 hover:border-red-600 transition-all">
                        View My CV <ArrowUpRightIcon size={16} />
                     </a>
                  </div>
               </div>

            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className={`grid grid-cols-12 border-b ${subBorderColor}`}>
               <div className={`col-span-12 md:col-span-3 p-8 md:p-12 border-b md:border-b-0 md:border-r ${subBorderColor}`}>
                  <span className={`block text-xs font-mono mb-2 uppercase tracking-widest ${mutedText}`}>02 / Work</span>
                  <h2 className="text-4xl font-bold tracking-tighter lowercase">projects.</h2>
               </div>

               <div className="col-span-12 md:col-span-9">
                  {siteInfo.projects.map((project, i) => (
                     <div key={i} className={`group p-8 md:p-12 border-b ${subBorderColor} last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors`}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                           <div>
                              <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-600 transition-colors">
                                 {project.title}
                              </h3>
                              <p className={`max-w-lg text-sm md:text-base leading-relaxed ${mutedText}`}>
                                 {project.description}
                              </p>
                           </div>
                           <a href={project.href} className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-none hover:bg-red-600 hover:text-white transition-colors self-start">
                              <ArrowUpRightIcon size={20} />
                           </a>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-auto">
                           {project.technologies.map(tech => (
                              <span key={tech} className={`text-[10px] font-mono uppercase px-2 py-1 border ${subBorderColor}`}>
                                 {tech}
                              </span>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="grid grid-cols-12">
               <div className={`col-span-12 md:col-span-6 p-8 md:p-12 border-b md:border-b-0 md:border-r ${subBorderColor}`}>
                  <span className={`block text-xs font-mono mb-2 uppercase tracking-widest ${mutedText}`}>03 / Connect</span>
                  <h2 className="text-4xl font-bold tracking-tighter lowercase mb-12">contact.</h2>

                  <div className="grid gap-8">
                     {siteInfo.contactLinks.map((link) => (
                        <a key={link.title} href={link.href} className="group block">
                           <div className="flex items-center justify-between mb-1">
                              <span className="text-lg font-bold uppercase group-hover:text-red-600 transition-colors">{link.title}</span>
                              <link.icon size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600" />
                           </div>
                           <span className={`text-xs font-mono ${mutedText}`}>{link.description}</span>
                           <div className={`w-full h-px mt-4 bg-current opacity-10 group-hover:opacity-100 transition-opacity`} />
                        </a>
                     ))}
                  </div>
               </div>

               {/* FORM */}
               <div className="col-span-12 md:col-span-6 p-8 md:p-12">
                  <ContactForm />
               </div>
            </section>

         </main>

         {/* FOOTER */}
         <Footer />
      </div>
   );
}
