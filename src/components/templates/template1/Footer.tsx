interface ContactProps {
  email: string;
  phone?: string;
}

export default function Footer({ contact }: { contact: ContactProps }) {
  return (
    <footer className="text-center mt-12 py-6 border-t border-gray-300 text-gray-600">
      <p>Contact: {contact.email} {contact.phone && `| ${contact.phone}`}</p>
      <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
    </footer>
  );
}
