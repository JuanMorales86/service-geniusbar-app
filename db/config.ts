//My base de datos
import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }), //puede logearse con otras alternativas como github o google o apple por ejemplo
    github_id: column.text({ optional: true, unique: true }), // esto lucia dice q va tipo number pero en realidad necesita es un text o string asi que va text
    google_id: column.text({ optional: true, unique: true}),
    failedAttempts: column.number({ default: 0}),
    lastFailedAttempt: column.text({ default: '0' }),
    isAdmin: column.boolean({ default: false }),
    totalAttempts: column.number({ default: 0}),
  }
})

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }), //OJO da error hasta ahora colocando id  en la ssesion como clave primaria pero con el lucia auth
    user_id: column.text({ optional: false, references: () => User.columns.id }),
    expires_at: column.number({ optional: false }),
  }
})

const Admin = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true}), 
    username: column.text({ unique: true }),
    accesLevel: column.text({ default: 'user'}),
  }
})

const Usermsj = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    // userId: column.text({ optional: false, references: () => User.columns.id || Usermsj.column.id }),
    userId: column.text({ optional: false }),
    nombre: column.text({ optional: false }),
    telefono: column.text({ optional: false }),
    email: column.text({ optional: false }),
    mensaje: column.text({ optional: false }),
    modelo: column.text({ optional: true }),
    opcionSeleccionada: column.text({ optional: false }),
    opcionDispositivo: column.text({ optional: false }),
  }
})



  const ServiceOrder = defineTable({
    columns: {
      id: column.text({ primaryKey: true, optional: false, unique: true}),
      ordernumber: column.text({optional: true, unique: true}),
      clientname: column.text({optional: true}),
      clientdni: column.text({optional: true}),
      email: column.text({ optional: true }),
      phone: column.text({ optional: true }),
      deviceType: column.text({ optional: true }),
      model: column.text({ optional: true }),
      serial: column.text({ optional: true }),
      issue: column.text({ optional: true }),
      phonedetails: column.text({optional: true}),
      devicepassword: column.text({optional: true}),
      status: column.text({ optional: true }),
      createdAt: column.number({ optional: true }),
      updatedAt: column.text({ optional: true }),
      aditionalObservation: column.text({ optional: true}),
      donerepairments: column.text({optional: true}),
      topay: column.number({ optional: true}),
      payed: column.number({ optional: true}),

    }
  })

  const OrderCount = defineTable({
    columns: {
      id: column.number({ primaryKey: true, autoIncrement: true}),//ID unico
      totalOrders: column.number({default: 0}), //Conteo total de ordenes
    }
  })

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Session,
    Usermsj,
    ServiceOrder,
    OrderCount,
    Admin,
  }
});
