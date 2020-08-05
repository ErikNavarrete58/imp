var express = require('express')
var router = express.Router()
const pool = require('../database');
const {isLoggenIn} = require('../lib/aut');


router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get("/menu",(req,res)=>{
    res.render("auth/adminmenu")
    
    } )

    router.get('/equipo', async  (req, res) => {
        const ediciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes` ORDER BY `Registros Global Equipo Heroes`.`id_plantel` DESC")
        console.log(ediciones)
            res.render('links/equipo',{ediciones})
            });
        
            router.post('/equipo',isLoggenIn, async  (req, res) => {
         const {Nombre, Delegado,id} = req.body;
         const equip = {
            Nombre_Equipo : Nombre  ,
            Delegado: Delegado  ,
             id_plantel : id
        };
        console.log(equip)
        await pool.query("INSERT INTO `Registros Global Equipo Heroes` set ?",[equip])
        
                    res.redirect('/admin/equipo')
        
                    });
        
          router.get('/editarequipos/:ID',isLoggenIn, async  (req, res) => {
            const {ID} = req.params;
        
        const ediciones = await pool.query("Select * From `Registros Global Equipo Heroes` WHERE id_plantel = ?",[ID])
        console.log(ediciones)
                res.render('ligasld/editarequipo',{ediciones})
                    });
        
              router.post('/editarplantel/:ID',isLoggenIn, async  (req, res) => {
                        const {Nombre, Delegado,id,Escudo,Fecha_Registro} = req.body;
                        const ID = id;
        
                        const equip = {
                           Nombre_Equipo : Nombre  ,
                           Delegado,
                           Escudo,
                           Fecha_Registro,
                        id_plantel:id
            
                       };
        
                      
                       console.log(equip)
                       console.log(ID)
        await pool.query("UPDATE `Registros Global Equipo Heroes` set ? Where id_plantel = ?",[equip,ID]);
                       
                                   res.redirect('/admin/equipo')
                       
                                   });
        
          router.get('/jugadores',isLoggenIn, async  (req, res) => {
        const ediciones = await pool.query("SELECT * FROM `Registro Global Heroes` ORDER BY `Registro Global Heroes`.`ID_FB` DESC")
        console.log(ediciones)
            res.render('links/jugadores',{ediciones})
            });
        
            router.post('/jugador',isLoggenIn, async  (req, res) => {
                const {Nombre,id} = req.body;
                const equip = {
                   Nombres : Nombre  ,
                    ID_FB : id
               };
               console.log(equip)
               await pool.query("INSERT INTO `Registro Global Heroes` set ?",[equip])
               
                           res.redirect('/admin/jugadores')
               
                           });
        
         router.get('/editarjugadores/:ID',isLoggenIn, async  (req, res) => {
            const {ID} = req.params;
        
        const ediciones = await pool.query("Select * From `Registro Global Heroes` WHERE ID_FB = ?",[ID])
        console.log(ediciones)
                res.render('ligasld/editarjugador',{ediciones})
                    });
        
        
           router.post('/editarjugador/:ID',isLoggenIn, async  (req, res) => {
                        const {Nombres, Curp,ID_FB,FOTO} = req.body;
                        const ID = ID_FB;
        
                        const equip = {
                           Nombres  ,
                           Curp,
                           ID_FB,
                           FOTO,    
                       };
        
                      
                       console.log(equip)
                       console.log(ID)
        await pool.query("UPDATE `Registro Global Heroes` set ? Where ID_FB = ?",[equip,ID]);
                       
                                   res.redirect('/admin/jugadores')
                       
                                   });
        

module.exports = router