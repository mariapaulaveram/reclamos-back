var express = require('express');
var router = express.Router();
var reclamosModel = require('../../models/reclamosModel');

//var util = require('util');
var cloudinary = require('cloudinary').v2; //es la version de cloudinary
//const uploader = util.promisify(cloudinary.uploader.upload);
//const destroy = util.promisify(cloudinary.uploader.destroy);


/*para listar los reclamos*/
router.get('/', async function(req, res, next) {

  var reclamos = await reclamosModel.getReclamos();

  reclamos = reclamos.map(reclamo => {
    if (reclamo.img_id) {
      const imagen = cloudinary.image(reclamo.img_id, {
        width: 70,
        height: 70,
        crop: 'fill' //pad
      });
      return {
        ...reclamo,
        imagen
      }
    }else{
      return{
        ...reclamo,
        imagen:''
      }
    }
  });

  res.render('admin/verReclamo',{ 
    layout:'admin/layout', 
    persona: req.session.nombre,
    reclamos
  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  })
});

module.exports = router;



/*
router.post('/agregar', async(req, res, next)=>{
  try{

    var img_id = '';
    if (req.files && Object.keys(req.files).length >0){
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo !="" && req.body.subtitulo !="" && req.body.cuerpo !=""){
      await reclamosModel.insertReclamos({
        ...req.body, 
        img_id
      });
      res.redirect('/admin/verReclamo')
    } else{
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error){
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout', 
      error:true,
      message: 'No se cargo el reclamo de interes'
    })
  }
})

/*para eliminar un reclamo de interes 
router.get('/eliminar/:id', async(req, res, next)=>{
  var id= req.params.id;

let reclamo = await reclamosModel.getReclamoById(id);
if (reclamo.img_id){
  await (destroy(reclamo.img_id));
}

  await reclamosModel.deleteReclamosById(id);
  res.redirect('/admin/verReclamo');

});

/*para mostrar el formulario y mostar un solo reclamo de interes 

router.get('/modificar/:id', async(req, res, next)=>{
  var id= req.params.id;
console.log(req.params.id);
var reclamo = await reclamosModel.getReclamoById(id);


res.render('admin/modificar', { //modificar.hbs
  layout: 'admin/layout',
  lugar
})

});

/*para modificar el reclamo de interes 

router.post('/modificar', async(req, res, next)=>{
  try {

      let img_id = req.body.img_original;
      let borrar_img_vieja = false;
      if(req.body.img_delete === "1"){
        img_id = null;
        borrar_img_vieja = true;
      }else{
        if (req.files && Object.keys(req.files).length > 0){
          imagen = req.files.imagen;
          img_id = (await uploader(imagen.tempFilePath)).public_id;
          borrar_img_vieja = true;
        }
      }
      if (borrar_img_vieja && req.body.img_original){
        await (destroy(req.body.img_original));
      }


    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id
    }
    console.log(obj)

    await reclamosModel.modificarReclamosById(obj, req.body.id);
    res.redirect('/admin/verReclamos');
  } catch (error){
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó el reclamo de interes'
    })
  }
})*/


