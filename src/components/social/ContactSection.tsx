import { Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel';
import Botanical from '../ui/Botanical';
import { contactChannels, type ContactChannel } from '../../data/social';
import { useT } from '../../hooks/useTranslation';

const ICONS: Record<ContactChannel['id'], LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  whatsapp: MessageCircle,
  email: Mail,
};

/**
 * Contact.
 *
 * Four channels, set as warm paper cards rather than a row of coloured social
 * badges, so the section belongs to the same material world as the rest of the
 * site. Destinations are placeholders — see `src/data/social.ts`.
 */
export default function ContactSection() {
  const { copy } = useT();

  const labels: Record<ContactChannel['id'], { title: string; note: string }> = {
    linkedin: { title: copy.contact.linkedin, note: copy.contact.linkedinNote },
    instagram: { title: copy.contact.instagram, note: copy.contact.instagramNote },
    whatsapp: { title: copy.contact.whatsapp, note: copy.contact.whatsappNote },
    email: { title: copy.contact.email, note: copy.contact.emailNote },
  };

  return (
    <section className="section contact" id="contact">
      <div className="shell contact__inner">
        <div className="contact__head">
          <SectionLabel index="09" label={copy.contact.label} />
          <h2 className="contact__title">{copy.contact.title}</h2>
          <p className="lede contact__body">{copy.contact.body}</p>
          <Botanical mark="cardamom" size={44} className="contact__mark" />
        </div>

        <ul className="contact__list">
          {contactChannels.map((channel) => {
            const Icon = ICONS[channel.id];
            const label = labels[channel.id];
            const isPlaceholder = channel.href === '#';
            return (
              <li key={channel.id}>
                <a
                  className="contact__card"
                  href={channel.href}
                  {...(isPlaceholder
                    ? { 'aria-disabled': true }
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="contact__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="contact__text">
                    <span className="contact__name">{label.title}</span>
                    <span className="contact__handle">{channel.handle}</span>
                    <span className="contact__note">{label.note}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="contact__placeholder">{copy.contact.placeholderNote}</p>
      </div>
    </section>
  );
}
