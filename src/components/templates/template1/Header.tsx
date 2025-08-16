interface HeaderProps {
  name: string;
  role: string;
  contact: {
    email?: string;
    phone?: string;
  };
  social: {
    github?: string;
    linkedin?: string;
  };
}

export default function Header({ name, role, contact, social }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <h1 className="bg-sky-50 text-4xl font-bold color">{name}</h1>
      <p className="text-xl text-gray-600">{role}</p>
      <div className="flex justify-center space-x-4 mt-2 text-blue-600">
        {social.github && <a href={social.github} target="_blank">GitHub</a>}
        {social.linkedin && <a href={social.linkedin} target="_blank">LinkedIn</a>}
      </div>
      <div className="text-gray-500 mt-1">
        {contact.email && <span>{contact.email}</span>} {contact.phone && <span> | {contact.phone}</span>}
      </div>
    </header>
  );
}
