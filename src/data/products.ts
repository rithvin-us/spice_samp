import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AURA Pulse Pro Cyber Headphones',
    tagline: 'Lossless Spatial Audio with Active Noise Suppression',
    category: 'Audio',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewsCount: 128,
    isNew: true,
    isFeatured: true,
    description: 'Engineered with custom beryllium drivers, active acoustic tuning, and ultra-lightweight titanium alloy frame for unmatched audio immersion.',
    features: [
      'Custom 40mm Beryllium Spatial Drivers',
      'Dual-Chamber Active Noise Cancellation (42dB)',
      '50-Hour Playtime with Rapid HyperCharge',
      'Haptic Ultra-Bass Tactile Feedback Engine'
    ],
    colors: [
      { id: 'c-cyan', name: 'Cyber Cyan', hex: '#06b6d4', accentHex: '#0891b2' },
      { id: 'c-purple', name: 'Neon Violet', hex: '#a855f7', accentHex: '#7e22ce' },
      { id: 'c-obsidian', name: 'Obsidian Black', hex: '#1e293b', accentHex: '#0f172a' },
      { id: 'c-silver', name: 'Titanium Silver', hex: '#e2e8f0', accentHex: '#94a3b8' }
    ],
    defaultColorId: 'c-cyan',
    config3D: {
      meshType: 'headphones',
      scale: 1.15,
      rotation: [0, Math.PI / 4, 0]
    },
    specs: {
      'Frequency Response': '5Hz - 45,000Hz',
      'Connectivity': 'Bluetooth 5.4 / Ultra-Low Latency Wireless USB-C',
      'Battery Life': '50 Hours (ANC On)',
      'Weight': '265 grams'
    }
  },
  {
    id: 'prod-2',
    name: 'VORTEX Velocity Pro Sneaker',
    tagline: '3D-Printed Lattice Cushioning & Dynamic Fit',
    category: 'Footwear',
    price: 220,
    originalPrice: 260,
    rating: 4.8,
    reviewsCount: 94,
    isNew: true,
    isFeatured: true,
    description: 'Designed for hyper-performance and urban aesthetics. Features light-cured elastomer 3D printed lattice soles that absorb shock and re-energize every stride.',
    features: [
      '3D-Printed Liquid Elastomer Lattice Sole',
      'Breathable Seamless Engineered FlyMesh Upper',
      'Self-Lacing Micro-Cable Tension System',
      'Reflective Kinetic Side Strips'
    ],
    colors: [
      { id: 'c-neon-orange', name: 'Solar Flame', hex: '#f97316', accentHex: '#ea580c' },
      { id: 'c-emerald', name: 'Hyper Emerald', hex: '#10b981', accentHex: '#059669' },
      { id: 'c-stealth', name: 'Stealth Matte', hex: '#334155', accentHex: '#1e293b' }
    ],
    defaultColorId: 'c-neon-orange',
    config3D: {
      meshType: 'sneaker',
      scale: 1.0,
      rotation: [0, -Math.PI / 6, 0]
    },
    specs: {
      'Sole Material': 'Carbon Digital Light Synthesis Elastomer',
      'Upper Material': 'Recycled Aerodynamic Knit',
      'Cushioning': '88% Energy Return Rate',
      'Weight': '290 grams per shoe'
    }
  },
  {
    id: 'prod-3',
    name: 'CHRONO Matrix X Smartwatch',
    tagline: 'Holographic Curved OLED with Biometric Telemetry',
    category: 'Wearables',
    price: 499,
    rating: 4.95,
    reviewsCount: 215,
    isFeatured: true,
    description: 'Crafted from aerospace Grade-5 Titanium with sapphire crystal glass. Features continuous ECG, blood oxygen, and real-time stress telemetry.',
    features: [
      'Sapphire Crystal Curved Micro-OLED Touch Screen',
      'Aerospace Titanium Unibody Casing',
      '100m Water Resistance (10 ATM)',
      '7-Day Continuous Telemetry Battery Life'
    ],
    colors: [
      { id: 'c-gold', name: 'Champagne Gold', hex: '#eab308', accentHex: '#ca8a04' },
      { id: 'c-space-black', name: 'Space Black', hex: '#0f172a', accentHex: '#020617' },
      { id: 'c-ocean-blue', name: 'Deep Ocean Blue', hex: '#2563eb', accentHex: '#1d4ed8' }
    ],
    defaultColorId: 'c-gold',
    config3D: {
      meshType: 'smartwatch',
      scale: 1.2,
      rotation: [Math.PI / 6, Math.PI / 4, 0]
    },
    specs: {
      'Display': '1.92-inch Retina Sapphire OLED (1000 nits)',
      'Case Material': 'Aerospace Grade 5 Titanium',
      'Sensors': 'Optical HR, SpO2, ECG, Altimeter, Gyro',
      'Water Rating': '10 ATM Waterproof'
    }
  },
  {
    id: 'prod-4',
    name: 'LUMINA Nectar Eau De Parfum',
    tagline: 'Rare Botanical Essence in Hand-Cut Crystal Flask',
    category: 'Lifestyle',
    price: 185,
    rating: 4.7,
    reviewsCount: 64,
    description: 'An evocative fragrance blending amber wood, wild bergamot, dark orchid, and glowing white musk inside a refractive crystal decanter.',
    features: [
      'Hand-Blown Refractive Glass Decanter',
      'Sustainably Sourced French Botanicals',
      '24-Hour Long Lasting EDP Concentration',
      'Custom 24K Gold Atomizer Cap'
    ],
    colors: [
      { id: 'c-amber', name: 'Golden Amber', hex: '#f59e0b', accentHex: '#d97706' },
      { id: 'c-rose', name: 'Midnight Rose', hex: '#f43f5e', accentHex: '#e11d48' },
      { id: 'c-sapphire', name: 'Celestial Sapphire', hex: '#3b82f6', accentHex: '#1d4ed8' }
    ],
    defaultColorId: 'c-amber',
    config3D: {
      meshType: 'perfume',
      scale: 1.1,
      rotation: [0, Math.PI / 3, 0]
    },
    specs: {
      'Volume': '100 ml / 3.4 fl oz',
      'Concentration': 'Eau De Parfum (25% Fragrance Oil)',
      'Bottle Material': 'Ultra-Clear Lead-Free Crystal',
      'Origin': 'Grasse, France'
    }
  }
];
