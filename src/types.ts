export type PageId = 'home' | 'about' | 'services' | 'gallery' | 'booking' | 'contact';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'skincare' | 'makeup' | 'nails' | 'bridal';
  categoryLabel: string;
  description: string;
  duration: string;
  priceSample: string;
  isPriceOnConsultation?: boolean;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'hair' | 'skincare' | 'makeup' | 'nails' | 'bridal';
  categoryLabel: string;
  image: string;
  description: string;
}

export interface AppointmentPayload {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}
