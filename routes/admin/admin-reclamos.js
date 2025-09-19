const express = require('express');
const router = express.Router();
const reclamosModel = require('../../models/reclamosModel');
const enviarCorreo = require('../../services/enviarCorreo');

router.get('/modificar/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log('GET /modificar/:id → ID recibido:', id);

  try {
    const reclamo = await reclamosModel.getReclamoById(id);
    console.log('Reclamo obtenido:', reclamo);

    res.render('admin/modificar', {
      layout: 'admin/layout',
      reclamo
    });
  } catch (error) {
    console.error('Error al obtener el reclamo:', error);
    res.redirect('/admin/reclamos');
  }
});

router.post('/modificar', async (req, res, next) => {
  const { id, estado, comentarios } = req.body;
  console.log('POST /modificar → Datos recibidos:', { id, estado, comentarios });

  try {
    if (id && estado && comentarios) {
      // Obtener el reclamo antes de modificar
      const reclamoAnterior = await reclamosModel.getReclamoById(id);
      const estadoAnterior = reclamoAnterior.estado;
      const comentarioAnterior = reclamoAnterior.comentarios;

      const estadoCambio = estado !== estadoAnterior;
      const comentarioCambio = comentarios !== comentarioAnterior;

      // Modificar el reclamo
      const resultado = await reclamosModel.modificarReclamoById({ estado, comentarios }, id);
      console.log('Resultado de la modificación:', resultado);

      // Enviar correo si hubo cambios
      if (estadoCambio || comentarioCambio) {
        const emailVecino = reclamoAnterior.email;
        const nombreVecino = reclamoAnterior.nombre;

        if (emailVecino) {
          const mensajeHTML = `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2>Actualización de tu reclamo</h2>
              <p>Hola ${nombreVecino},</p>
              <p>Tu reclamo ha sido actualizado por el municipio.</p>
              ${estadoCambio ? `<p><strong>Nuevo estado:</strong> ${estado}</p>` : ''}
              ${comentarioCambio ? `<p><strong>Comentario:</strong> ${comentarios}</p>` : ''}
              <p>Podés hacer seguimiento desde la plataforma Voz Ciudadana.</p>
              <br>
              <p>Gracias,<br>El equipo de Voz Ciudadana</p>
            </div>
          `;

          try {
            await enviarCorreo(emailVecino, 'Actualización de tu reclamo – Voz Ciudadana', mensajeHTML);
            console.log('📧 Notificación enviada a:', emailVecino);
          } catch (error) {
            console.error('❌ Error al enviar notificación al vecino:', error);
          }
        }
      }

      res.redirect('/admin/inicio');
    } else {
      console.warn('Faltan datos para modificar:', { id, estado, comentarios });

      res.render('admin/modificar', {
        layout: 'admin/layout',
        error: true,
        reclamo: { id, estado, comentarios },
        mensaje: 'El ID y el estado son obligatorios'
      });
    }
  } catch (error) {
    console.error('Error al modificar el reclamo:', error);
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      mensaje: 'No se pudo modificar el estado del reclamo'
    });
  }
});

module.exports = router;
