// External links always open in new tab with proper security attributes
export default function ExternalLink({ href, children, className = '', ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}
