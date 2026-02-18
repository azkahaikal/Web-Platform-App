'use client';

import { useState, useCallback } from 'react';

// Jika tidak pakai Zustand, gunakan ini sebagai custom hook tambahan
// Jika pakai Zustand, ganti isi file ini

export type UIState = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export function useUIStore(): UIState {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return { isMenuOpen, toggleMenu, closeMenu };
}