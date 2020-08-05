var express = require('express')
var router = express.Router()
const pool = require('../database');


router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/id', function (req, res) {
    res.render('ligasld/id')
})

router.post('/id', async (req, res) => {
    const {id} = req.body;

    console.log(id)
const registro = await pool.query("Select * From `Registro Global Heroes` WHERE ID_FB = ?" , [id])
const premiacion = await pool.query("Select * From `Premiaciones_Individuales` WHERE ID_FB = ?" , [id])
const toractual = await pool.query("Select * From `ed_tablagoleo_fm_a20` WHERE ID_FB = ?" , [id])
const goleslibre = await pool.query("Select * From `ed_goleohistorico_libre` WHERE ID_FB = ?" , [id])
const golesfeme = await pool.query("Select * From `ed_goleohistorico_femenil` WHERE ID_FB = ?" , [id])
const goles23 = await pool.query("Select * From `ed_tablagoleo_s23_a20` WHERE ID_FB = ?" , [id])
const goles20 = await pool.query("Select * From `ed_tablagoleo_s20_a20` WHERE ID_FB = ?" , [id])

res.render('ligasld/idlogros',{registro,premiacion, toractual,goleslibre,golesfeme,goles23,goles20},)
})

router.post('/idbuscar', async (req, res) => {
    const {id} = req.body;
const idp = "%"+ id + "%";
    console.log(idp)
const idbuscar = await pool.query("SELECT * FROM `Registro Global Heroes` WHERE `Nombres` LIKE ?",[idp])
console.log(idbuscar)
res.render('ligasld/idbuscar',{idbuscar})
})


router.get('/idequipo', function (req, res) {
    res.render('ligasld/idequipo')
})

router.post('/idequipo', async (req, res) => {
    const {id} = req.body;

    console.log(id)
    const Globales = await pool.query("Select * From `ed_puntoshistoricos` WHERE ID = ?" , [id])
    const Globaleslb = await pool.query("Select * From `ed_libre_tabla_historica_2020` WHERE ID = ?" , [id])
    const Globalesfeme = await pool.query("Select * From `ed_general_historico_femenil_20` WHERE ID = ?" , [id])
    const Globalesmix = await pool.query("Select * From `ed_general_historico_mixto` WHERE ID = ?" , [id])
    const Globales23 = await pool.query("Select * From `ed_s23_historica_20` WHERE ID = ?" , [id])
    const Globales20 = await pool.query("Select * From `ED_S20_HISTORICA_2020` WHERE ID = ?" , [id])
    const Globales17 = await pool.query("Select * From `ed_historico_17` WHERE ID = ?" , [id])



const registro = await pool.query("Select * From `Registros Global Equipo Heroes` WHERE Id_plantel = ?" , [id])
const logrosequipos = await pool.query("Select * From `Historial_Campeones` WHERE Id_plantel = ?" , [id])

res.render('ligasld/idlogrosequipo',{registro,logrosequipos,Globales,Globaleslb,Globalesmix,Globalesfeme,Globales23,Globales20,Globales17},)
})

router.post('/idbuscarequipos', async (req, res) => {
    const {id} = req.body;
const idp = "%"+ id + "%";
    console.log(idp)
const idbuscar = await pool.query("SELECT * FROM `Registros Global Equipo Heroes` WHERE `Nombre_Equipo` LIKE ?" , [idp])
console.log(idbuscar)
res.render('ligasld/idbuscarequipos',{idbuscar})
})



module.exports = router