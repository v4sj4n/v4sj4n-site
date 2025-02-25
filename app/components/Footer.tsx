import { siteConfig, socialIcons } from "@/config/site";
import { Code, MapPin, Envelope } from "@phosphor-icons/react/dist/ssr";

export const Footer = () => {
  return (
    <footer
      id="about"
      className="bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800/50 py-12 scroll-mt-24 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              vasjan<span className="text-red-600">.</span>
            </h2>
            <p className="text-zinc-400 mb-4 leading-relaxed flex items-start">
              <Code
                weight="fill"
                className="mt-1 mr-2 flex-shrink-0"
                size={18}
              />
              <span>
                Full-stack developer specializing in creating powerful web
                solutions that drive business growth.
              </span>
            </p>
            <p className="text-zinc-500 flex items-center">
              <MapPin weight="fill" className="mr-2" size={18} />
              Based in Albania, working worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-zinc-200">
              Navigation
            </h3>
            <ul className="space-y-2">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-zinc-400 hover:text-red-500 transition-colors flex items-center"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-zinc-200">Connect</h3>
            <ul className="space-y-2">
              {Object.entries(siteConfig.links).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-red-500 transition-colors flex items-center"
                  >
                    {socialIcons[platform]}
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-zinc-400 hover:text-red-500 transition-colors flex items-center"
                >
                  <Envelope weight="fill" className="mr-2" size={18} />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-zinc-800/50">
          <p className="text-zinc-500">
            © {new Date().getFullYear()} Vasjan Çupri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
