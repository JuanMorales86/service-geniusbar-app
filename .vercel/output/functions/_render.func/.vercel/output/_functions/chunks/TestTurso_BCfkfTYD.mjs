export { renderers } from '../renderers.mjs';

const page = () => import('./pages/TestTurso_Dd07clhr.mjs').then(n => n.T);

export { page };
