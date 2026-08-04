import { routes } from './constants';

import * as Pages from '@/pages';

import { Routes, Route, Navigate } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.curriculo} element={<Pages.CurriculumPage />} />

      <Route path="*" element={<Navigate to={routes.curriculo} replace />} />
    </Routes>
  );
};
