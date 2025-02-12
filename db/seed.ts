import { db, User, Usermsj, Session, ServiceOrder, OrderCount, Admin } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// Insert Users
	await db.insert(User).values([
		{
		  id: 'avxcy0sqaviij0b',
		  username: 'JUANMORALES86',
		  password: '$argon2id$v=19$m=19456,t=2,p=1$+mwCRmMrLccp+8Naq7CwwQ$n6uEQCDXlzeYciNqFSWOxVQ7C3kiAStb+ZJGhEOl7Mg',
		  github_id: null,
		  google_id: null,
		  failedAttempts: 0,
		  lastFailedAttempt: '0',
		  isAdmin: false,
		  totalAttempts: 0
		},
		{
		  id: 'i18hi1my2e07muz',
		  username: 'juanjosemorales1986@gmail.com',
		  password: '$argon2id$v=19$m=19456,t=2,p=1$cumM8IewEUc4cYOVA7q/sA$mWkVzu+fvAi7ptrX+3shwzkbdgpAm0KSJTYiqD9Tpbo',
		  github_id: null,
		  google_id: null,
		  failedAttempts: 0,
		  lastFailedAttempt: '0',
		  isAdmin: true,
		  totalAttempts: 1
		},
		{
		  id: 'x6iwbigfu5fpz5a',
		  username: 'JUANDEV',
		  password: '$argon2id$v=19$m=19456,t=2,p=1$pzNiaSTOy71th5ReUfwhdw$aGOGT8a8uX4s4t+i07QW1AHRvMNYg+EuQFwhXEw7JfQ',
		  github_id: null,
		  google_id: null,
		  failedAttempts: 0,
		  lastFailedAttempt: '0',
		  isAdmin: true,
		  totalAttempts: 4
		}
	  ]);
	
	  // Insert Sessions
	  await db.insert(Session).values([
		{
		  id: 's30brfz14n5n548qtmlllxqoqykw7lf3vvp7gvav',
		  user_id: 'avxcy0sqaviij0b',
		  expires_at: 1715798806
		},
		{
		  id: '7rh9dimgdzgaqwme8dyhlj739dwbqjgqxuwl65fk',
		  user_id: 'i18hi1my2e07muz',
		  expires_at: 1719774968
		}
	  ]);
	
	  // Insert Usermsj
	  await db.insert(Usermsj).values([
		{
		  id: 'k1euhu9bmpcgkiq',
		  userId: 'k1euhu9bmpcgkiq',
		  nombre: 'Juan',
		  telefono: '1123560959',
		  email: 'juanjosemorales1986@gmail.com',
		  mensaje: 'ddwefew',
		  opcionSeleccionada: 'Servicio Iphone',
		  opcionDispositivo: 'Iphone 12 Pro',
		  modelo: 'A2125'
		}
	  ]);
	
	  // Insert ServiceOrder
	  await db.insert(ServiceOrder).values([
		{
		  id: 'bvfyzxgx264fhkf',
		  ordernumber: 'Orden001',
		  clientname: 'Alfonso',
		  clientdni: '19543234',
		  email: 'pedro@gmail.com',
		  phone: '11245678234',
		  deviceType: 'Celular',
		  model: 'Samsung S24',
		  serial: 'SM-15900',
		  issue: 'Mojados',
		  phonedetails: 'Equipo Mojado',
		  devicepassword: '12345',
		  status: 'En proceso',
		  createdAt: 1695142440,
		  updatedAt: '1698616760',
		  aditionalObservation: 'Mantenimiento hecho',
		  donerepairments: 'Mantenimiento',
		  topay: 25000,
		  payed: 30000
		}
	  ]);
	
	  // Insert OrderCount
	  await db.insert(OrderCount).values([
		{
		  id: 1,
		  totalOrders: 2
		}
	  ]);
	
	  // Insert Admin
	  await db.insert(Admin).values([
		{
		  id: '124590',
		  username: 'JUANDEV',
		  accesLevel: 'admin'
		}
	  ]);
}
