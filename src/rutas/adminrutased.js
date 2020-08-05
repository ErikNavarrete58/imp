var express = require('express')
var router = express.Router()
const pool = require('../database');
const {isLoggenIn} = require('../lib/aut');

//no tocar
// middleware que es específico para este enrutador
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define la ruta de la página principal
///no tocar




///Ruta de formulario resultados de equipos


////
////
////
////  ENRUTAMIENTO CATEGORIA MIXTA 
////
////
////
////
////

router.get('/add',isLoggenIn, async (req, res) => {
    const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
    console.log(opciones)
        res.render('links/add' , {opciones : opciones} )
    })
router.post('/add', async (req, res) => {
 const {Jornada,Fecha,hora,Equipo,Rival,Equipo2,Rival2,Equipo3,Rival3,Equipo4,Rival4,Equipo5,Rival5,hora2,hora3,hora4,hora5} = req.body;
 const Regis1 = {
     Jornada ,
     Fecha  ,
     hora,
     Equipo,
     Rival,
 };
 
const Regis3 = {
    Jornada ,
    Fecha  ,
    hora: hora2,
    Equipo : Equipo2,
    Rival: Rival2,
};


const Regis5 = {
    Jornada ,
    Fecha  ,
    hora : hora3,
    Equipo : Equipo3,
    Rival : Rival3
};


const Regis7 = {
   Jornada ,
   Fecha  ,
   hora : hora4 ,
   Equipo : Equipo4,
   Rival: Rival4,
};

const Regis9 = {
    Jornada ,
    Fecha  ,
    hora: hora5,
    Equipo : Equipo5,
    Rival: Rival5,
 };
 
await pool.query("INSERT INTO `Mixto 2020 Apertura ed` set ?",[Regis1])
await pool.query("INSERT INTO `Mixto 2020 Apertura ed` set ?",[Regis3])
await pool.query("INSERT INTO `Mixto 2020 Apertura ed` set ?",[Regis5])
await pool.query("INSERT INTO `Mixto 2020 Apertura ed` set ?",[Regis7])
await pool.query('INSERT INTO `Mixto 2020 Apertura ed` set ?',[Regis9])

res.redirect('./vista')
})
///Ruta de formulario resultados de equipos

///Ruta de visualizacion de resultados
router.get('/vista',isLoggenIn, async  (req, res) => {
    const vistas = await pool.query("SELECT * FROM `jor_ed_mix_a20` ORDER BY `jor_ed_mix_a20`.`ID` DESC");
     res.render('links/vistas', { vistas } )
    });
///Ruta de visualizacion de resultados

///Ruta de eliminacion de resultados
router.get('/delete/:ID',isLoggenIn, async  (req, res) => {
const {ID} = req.params;
await pool.query("Delete From `Mixto 2020 Apertura ed` WHERE ID = ?" , [ID])
    res.redirect('/admin/vista' )
    });
///Ruta de eliminacion de resultados

///Edicion de las vistas
router.get('/edit/:ID',isLoggenIn, async  (req, res) => {
    const {ID} = req.params;
    const ediciones = await pool.query("Select * From `Mixto 2020 Apertura ed` WHERE ID = ?" , [ID])
    const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");

    res.render('links/edit', {ediciones: ediciones[0], opciones:opciones})
        });
///edicion de las vistas
router.post('/edit/:ID', async  (req, res) => {
    const {ID} = req.params;
const {Jornada,Fecha,hora,Equipo,Rival,GF,GC,pt1,pt2} = req.body;
const Regisedit = {
    Jornada ,
    Fecha  ,
    hora,
    Equipo,
    Rival,
    GF,
    GC,
   Puntos: pt1
};
const Regisedit2 = {
    Jornada ,
    Fecha  ,
    hora,
    Equipo :Rival,
    Rival: Equipo,
    GF: GC,
    GC: GF,
    Puntos: pt2
};
await pool.query("UPDATE `Mixto 2020 Apertura ed` set ? Where id = ?",[Regisedit,ID]);
await pool.query("INSERT INTO `Mixto 2020 Apertura ed` set ?",[Regisedit2]);

res.redirect('/admin/vista' )

        });

/// editar goles liga ed


////
////
////
////  FIN ENRUTAMIENTO CATEGORIA MIXTA 
////
////
////
////
////





////
////
////
////  ENRUTAMIENTO CATEGORIA Libre 
////
////
////
////
////


router.get('/edlibreadd',isLoggenIn, async (req, res) => {
    const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
    console.log(opciones)
        res.render('admined/add' , {opciones : opciones} )
    })


router.post('/edlibreadd',isLoggenIn, async (req, res) => {
    const {Jornada,Fecha,hora,Equipo,Rival,Equipo2,Rival2,Equipo3,Rival3,Equipo4,Rival4,Equipo5,Rival5,hora2,hora3,hora4,hora5} = req.body;
    const Regis1 = {
        Jornada ,
        Fecha  ,
        hora,
        Equipo,
        Rival,
    };
    
   const Regis3 = {
       Jornada ,
       Fecha  ,
       hora: hora2,
       Equipo : Equipo2,
       Rival: Rival2,
   };
   
   
   const Regis5 = {
       Jornada ,
       Fecha  ,
       hora : hora3,
       Equipo : Equipo3,
       Rival : Rival3
   };
   
   
   const Regis7 = {
      Jornada ,
      Fecha  ,
      hora : hora4 ,
      Equipo : Equipo4,
      Rival: Rival4,
   };
   
   const Regis9 = {
       Jornada ,
       Fecha  ,
       hora: hora5,
       Equipo : Equipo5,
       Rival: Rival5,
    };
    
   await pool.query("INSERT INTO `Libre 2020 Apertura ED` set ?",[Regis1])
   await pool.query("INSERT INTO `Libre 2020 Apertura ED` set ?",[Regis3])
   await pool.query("INSERT INTO `Libre 2020 Apertura ED` set ?",[Regis5])
   await pool.query("INSERT INTO `Libre 2020 Apertura ED` set ?",[Regis7])
   await pool.query('INSERT INTO `Libre 2020 Apertura ED` set ?',[Regis9])
   
   res.redirect('./edlibrevista')
   })
   ///Ruta de formulario resultados de equipos
   
   
   
   ///Ruta de visualizacion de resultados
   router.get('/edlibrevista',isLoggenIn, async  (req, res) => {
       const vistas = await pool.query("SELECT * FROM `ed_jor_libre_a20` ORDER BY `ed_jor_libre_a20`.`ID` DESC");
        res.render('admined/vistas', { vistas } )
       });
   ///Ruta de visualizacion de resultados
   
   
   ///Ruta de eliminacion de resultados
   router.get('/edlibredelete/:ID',isLoggenIn, async  (req, res) => {
   const {ID} = req.params;
   await pool.query("Delete From `Libre 2020 Apertura ED` WHERE ID = ?" , [ID])
       res.redirect('/admin/edlibrevista' )
       });
   ///Ruta de eliminacion de resultados
   
   ///Edicion de las vistas
   router.get('/edlibreedit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
       const ediciones = await pool.query("Select * From `Libre 2020 Apertura ED` WHERE ID = ?" , [ID])
       const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
   
       res.render('links/edit', {ediciones: ediciones[0], opciones:opciones})
           });
   ///edicion de las vistas
 router.post('/edlibreedit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
   const {Jornada,Fecha,hora,Equipo,Rival,GF,GC,pt1,pt2} = req.body;
   const Regisedit = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo,
       Rival,
       GF,
       GC,
      Puntos: pt1
   };
   const Regisedit2 = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo :Rival,
       Rival: Equipo,
       GF: GC,
       GC: GF,
       Puntos: pt2
   };
   await pool.query("UPDATE `Libre 2020 Apertura ED` set ? Where id = ?",[Regisedit,ID]);
   await pool.query("INSERT INTO `Libre 2020 Apertura ED` set ?",[Regisedit2])
   
   res.redirect('/admin/edlibrevista' )
   
           });
   
   /// editar goles liga ed
   
 router.get('/edlibregoles',isLoggenIn , async  (req, res) => {
       const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
       const jugadores = await pool.query("SELECT * FROM `Registro Global Heroes`");
       const mixtagol = await pool.query("SELECT * FROM `ed_goleojor_libre_a20` WHERE 1 GROUP by `ID_FB` ORDER BY `ed_goleojor_libre_a20`.`Nombre_Equipo` ASC");
       const mixtagolind = await pool.query("SELECT * FROM `ed_goleojor_libre_a20` ORDER BY `ed_goleojor_libre_a20`.`id_registro` DESC");
   
       res.render('admined/goleo' ,{ opciones , jugadores , mixtagol,mixtagolind})
       });
   
 router.post('/edlibregoles',isLoggenIn, async  (req, res) => {
          console.log
          const {Jornada,Fecha,Hora,Equipo1,Rival,idl,idv,nam1,namv,dor1,dorv,gl,gv,id2,idv2,nam2,namv2,dor2,dorv2,gl2,gv2,idl3,idv3,naml3,namv3,dor3,dorv3,gl3,gv3} = req.body;
          const Regisedit = {
           id :idl,
           nombre :nam1,
           Dorsal:dor1,
           Equipo: Equipo1,
           Goles: gl,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv = {
           id :idv,
           nombre :namv,
           Dorsal:dorv,
           Equipo: Rival,
           Goles: gv,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
   
       const Regisedit2 = {
           id :id2,
           nombre :nam2,
           Dorsal:dor2,
           Equipo: Equipo1,
           Goles: gl2,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv2 = {
           id :idv2,
           nombre :namv2,
           Dorsal:dorv2,
           Equipo: Rival,
           Goles: gv2,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
       const Regisedit3 = {
           id :idl3,
           nombre :naml3,
           Dorsal:dor3,
           Equipo: Equipo1,
           Goles: gl3,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv3 = {
           id :idv3,
           nombre :namv3,
           Dorsal:dorv3,
           Equipo: Rival,
           Goles: gv3,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
   
       console.log(Regisedit)
       await pool.query("INSERT INTO `Goleo_ED_Libre_A20` set ?",[Regisedit])
       await pool.query("INSERT INTO `Goleo_ED_Libre_A20` set ?",[Regisedit2])
       await pool.query("INSERT INTO `Goleo_ED_Libre_A20` set ?",[Regisedit3])
   
       await pool.query("INSERT INTO `Goleo_ED_Libre_A20` set ?",[Regiseditv])
       await pool.query("INSERT INTO `Goleo_ED_Libre_A20` set ?",[Regiseditv2])
       await pool.query("INSERT INTO `Goleo_ED_Libre_A20` set ?",[Regisedit3])
   
          res.redirect('/admin/edlibregoles' )
       });
   
 router.get('/edlibreborrargoleadores/:ID',isLoggenIn, async  (req, res) => {
           const {ID} = req.params;
           console.log(ID);
    await pool.query("Delete From `Goleo_ED_Libre_A20` WHERE id_registro = ?" , [ID])
           res.redirect('/admin/edlibregoles' )
               });
   
 router.get('/edlibreeditgoleadores/:ID',isLoggenIn, async  (req, res) => {
            const {ID} = req.params;
               console.log(ID)
    const ediciones = await pool.query("Select * From `Goleo_ED_Libre_A20` WHERE id_registro = ?" , [ID])
   
        res.render('admined/editgoleadores', {ediciones})
                   });
   
   
 router.post('/edlibreediciongoleadores/:ID',isLoggenIn, async  (req, res) => {
                       const {ID} = req.params;
   
                       const {Jornada,Fecha,hora,id,nombre,Equipo,Dorsal,Rival,Goles,id_registro} = req.body;
   
                       const editgol1 = {
                           Jornada ,
                           Fecha  ,
                           hora,
                           id,
                           nombre,
                           Equipo,
                           Dorsal,
                           Rival,
                           Goles
       
                       };
   
                       console.log(ID)
                       await pool.query("UPDATE `Goleo_ED_Libre_A20` set ? Where id_registro = ?",[editgol1,ID]);
   
                     res.redirect('/admin/edlibregoles' )
                              });
   

////
////
////
////  fin ENRUTAMIENTO CATEGORIA Libre 
////
////
////
////
////

////
////
////
////  ENRUTAMIENTO CATEGORIA Femenil 
////
////
////
////
////


router.get('/edfemadd',isLoggenIn, async (req, res) => {
    const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
    console.log(opciones)
        res.render('admined/addfem' , {opciones : opciones} )
    })


router.post('/edfemadd',isLoggenIn, async (req, res) => {
    const {Jornada,Fecha,hora,Equipo,Rival,Equipo2,Rival2,Equipo3,Rival3,Equipo4,Rival4,Equipo5,Rival5,hora2,hora3,hora4,hora5} = req.body;
    const Regis1 = {
        Jornada ,
        Fecha  ,
        hora,
        Equipo,
        Rival,
    };
    
   const Regis3 = {
       Jornada ,
       Fecha  ,
       hora: hora2,
       Equipo : Equipo2,
       Rival: Rival2,
   };
   
   
   const Regis5 = {
       Jornada ,
       Fecha  ,
       hora : hora3,
       Equipo : Equipo3,
       Rival : Rival3
   };
   
   
   const Regis7 = {
      Jornada ,
      Fecha  ,
      hora : hora4 ,
      Equipo : Equipo4,
      Rival: Rival4,
   };
   
   const Regis9 = {
       Jornada ,
       Fecha  ,
       hora: hora5,
       Equipo : Equipo5,
       Rival: Rival5,
    };
    
   await pool.query("INSERT INTO `ED Femenil 2020 Apertura` set ?",[Regis1])
   await pool.query("INSERT INTO `ED Femenil 2020 Apertura` set ?",[Regis3])
   await pool.query("INSERT INTO `ED Femenil 2020 Apertura` set ?",[Regis5])
   await pool.query("INSERT INTO `ED Femenil 2020 Apertura` set ?",[Regis7])
   await pool.query('INSERT INTO `ED Femenil 2020 Apertura` set ?',[Regis9])
   
   res.redirect('./edfemvista')
   })
   ///Ruta de formulario resultados de equipos
   
   
   
   ///Ruta de visualizacion de resultados
   router.get('/edfemvista',isLoggenIn, async  (req, res) => {
       const vistas = await pool.query("SELECT * FROM `ed_jor_feme_a20` ORDER BY `ed_jor_feme_a20`.`ID` DESC");
        res.render('admined/vistasfem', { vistas } )
       });
   ///Ruta de visualizacion de resultados
   
   
   ///Ruta de eliminacion de resultados
   router.get('/edfemdelete/:ID',isLoggenIn, async  (req, res) => {
   const {ID} = req.params;
   await pool.query("Delete From `ED Femenil 2020 Apertura` WHERE ID = ?" , [ID])
       res.redirect('/admin/edfemvista' )
       });
   ///Ruta de eliminacion de resultados
   
   ///Edicion de las vistas
   router.get('/edfemedit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
       const ediciones = await pool.query("Select * From `ED Femenil 2020 Apertura` WHERE ID = ?" , [ID])
       const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
   
       res.render('admined/editfem', {ediciones: ediciones[0], opciones:opciones})
           });
   ///edicion de las vistas
 router.post('/edfemedit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
   const {Jornada,Fecha,hora,Equipo,Rival,GF,GC,pt1,pt2} = req.body;
   const Regisedit = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo,
       Rival,
       GF,
       GC,
      Puntos: pt1
   };
   const Regisedit2 = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo :Rival,
       Rival: Equipo,
       GF: GC,
       GC: GF,
       Puntos: pt2
   };
   await pool.query("UPDATE `ED Femenil 2020 Apertura` set ? Where id = ?",[Regisedit,ID]);
   await pool.query("INSERT INTO `ED Femenil 2020 Apertura` set ?",[Regisedit2])
   
   res.redirect('/admin/edfemvista' )
   
           });
   
   /// editar goles liga ed
   
 
router.get('/goles',isLoggenIn, async  (req, res) => {
    const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
    const jugadores = await pool.query("SELECT * FROM `Registro Global Heroes`");
    const mixtagol = await pool.query("SELECT * FROM `ed_goleojor_feme_a20` WHERE 1 GROUP by `ID_FB` ORDER BY `ed_goleojor_feme_a20`.`Nombre_Equipo` ASC");
    const mixtagolind = await pool.query("SELECT * FROM `ed_goleojor_feme_a20` ORDER BY `ed_goleojor_feme_a20`.`id_registro` DESC");

    res.render('links/goleo' ,{ opciones , jugadores , mixtagol,mixtagolind})
    });

    router.post('/goles',isLoggenIn, async  (req, res) => {
       console.log
       const {Jornada,Fecha,Hora,Equipo1,Rival,idl,idv,nam1,namv,dor1,dorv,gl,gv,id2,idv2,nam2,namv2,dor2,dorv2,gl2,gv2,idl3,idv3,naml3,namv3,dor3,dorv3,gl3,gv3} = req.body;
       const Regisedit = {
        id :idl,
        nombre :nam1,
        Dorsal:dor1,
        Equipo: Equipo1,
        Goles: gl,
        Jornada,
        Rival,
       Fecha,
       Hora
    };
    const Regiseditv = {
        id :idv,
        nombre :namv,
        Dorsal:dorv,
        Equipo: Rival,
        Goles: gv,
        Jornada,
        Rival:Equipo1,
       Fecha,
       Hora
    };

    const Regisedit2 = {
        id :id2,
        nombre :nam2,
        Dorsal:dor2,
        Equipo: Equipo1,
        Goles: gl2,
        Jornada,
        Rival,
       Fecha,
       Hora
    };
    const Regiseditv2 = {
        id :idv2,
        nombre :namv2,
        Dorsal:dorv2,
        Equipo: Rival,
        Goles: gv2,
        Jornada,
        Rival:Equipo1,
       Fecha,
       Hora
    };
    const Regisedit3 = {
        id :idl3,
        nombre :naml3,
        Dorsal:dor3,
        Equipo: Equipo1,
        Goles: gl3,
        Jornada,
        Rival,
       Fecha,
       Hora
    };
    const Regiseditv3 = {
        id :idv3,
        nombre :namv3,
        Dorsal:dorv3,
        Equipo: Rival,
        Goles: gv3,
        Jornada,
        Rival:Equipo1,
       Fecha,
       Hora
    };

    console.log(Regisedit)
    await pool.query("INSERT INTO `Goleo_ED_feme_A20` set ?",[Regisedit])
    await pool.query("INSERT INTO `Goleo_ED_feme_A20` set ?",[Regisedit2])
    await pool.query("INSERT INTO `Goleo_ED_feme_A20` set ?",[Regisedit3])

    await pool.query("INSERT INTO `Goleo_ED_feme_A20` set ?",[Regiseditv])
    await pool.query("INSERT INTO `Goleo_ED_feme_A20` set ?",[Regiseditv2])
    await pool.query("INSERT INTO `Goleo_ED_feme_A20` set ?",[Regisedit3])

       res.redirect('/admin/goles' )
    });

    router.get('/borrargoleadores/:ID',isLoggenIn, async  (req, res) => {
        const {ID} = req.params;
        console.log(ID);
 await pool.query("Delete From `Goleo_ED_feme_A20` WHERE id_registro = ?" , [ID])
        res.redirect('/admin/goles' )
            });

     router.get('/editgoleadores/:ID',isLoggenIn, async  (req, res) => {
         const {ID} = req.params;
            console.log(ID)
 const ediciones = await pool.query("Select * From `Goleo_ED_feme_A20` WHERE id_registro = ?" , [ID])

     res.render('links/editgoleadores', {ediciones})
                });


                router.post('/ediciongoleadores/:ID',isLoggenIn, async  (req, res) => {
                    const {ID} = req.params;

                    const {Jornada,Fecha,hora,id,nombre,Equipo,Dorsal,Rival,Goles,id_registro} = req.body;

                    const editgol1 = {
                        Jornada ,
                        Fecha  ,
                        hora,
                        id,
                        nombre,
                        Equipo,
                        Dorsal,
                        Rival,
                        Goles
    
                    };

                    console.log(ID)
                    await pool.query("UPDATE `Goleo_ED_feme_A20` set ? Where id_registro = ?",[editgol1,ID]);

                  res.redirect('/admin/goles' )
                           });

////
////
////
////  ENRUTAMIENTO CATEGORIA Femenil 
////
////
////
////
////

////
////
////
////  ENRUTAMIENTO CATEGORIA SUB-20 
////
////
////
////
////





router.get('/eds20add',isLoggenIn, async (req, res) => {
    const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
    console.log(opciones)
        res.render('admined/adds20' , {opciones : opciones} )
    })


router.post('/eds20add',isLoggenIn, async (req, res) => {
    const {Jornada,Fecha,hora,Equipo,Rival,Equipo2,Rival2,Equipo3,Rival3,Equipo4,Rival4,Equipo5,Rival5,hora2,hora3,hora4,hora5} = req.body;
    const Regis1 = {
        Jornada ,
        Fecha  ,
        hora,
        Equipo,
        Rival,
    };
    
   const Regis3 = {
       Jornada ,
       Fecha  ,
       hora: hora2,
       Equipo : Equipo2,
       Rival: Rival2,
   };
   
   
   const Regis5 = {
       Jornada ,
       Fecha  ,
       hora : hora3,
       Equipo : Equipo3,
       Rival : Rival3
   };
   
   
   const Regis7 = {
      Jornada ,
      Fecha  ,
      hora : hora4 ,
      Equipo : Equipo4,
      Rival: Rival4,
   };
   
   const Regis9 = {
       Jornada ,
       Fecha  ,
       hora: hora5,
       Equipo : Equipo5,
       Rival: Rival5,
    };
    
   await pool.query("INSERT INTO `Sub-20 2020 Apertura ED` set ?",[Regis1])
   await pool.query("INSERT INTO `Sub-20 2020 Apertura ED` set ?",[Regis3])
   await pool.query("INSERT INTO `Sub-20 2020 Apertura ED` set ?",[Regis5])
   await pool.query("INSERT INTO `Sub-20 2020 Apertura ED` set ?",[Regis7])
   await pool.query('INSERT INTO `Sub-20 2020 Apertura ED` set ?',[Regis9])
   
   res.redirect('./eds20vista')
   })
   ///Ruta de formulario resultados de equipos
   
   
   
   ///Ruta de visualizacion de resultados
   router.get('/eds20vista',isLoggenIn, async  (req, res) => {
       const vistas = await pool.query("SELECT * FROM `ed_jor_sub20_a20` ORDER BY `ed_jor_sub20_a20`.`ID` DESC");
        res.render('admined/vistass20', { vistas } )
       });
   ///Ruta de visualizacion de resultados
   
   
   ///Ruta de eliminacion de resultados
   router.get('/eds20delete/:ID',isLoggenIn, async  (req, res) => {
   const {ID} = req.params;
   await pool.query("Delete From `Sub-20 2020 Apertura ED` WHERE ID = ?" , [ID])
       res.redirect('/admin/eds20vista' )
       });
   ///Ruta de eliminacion de resultados
   
   ///Edicion de las vistas
   router.get('/eds20edit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
       const ediciones = await pool.query("Select * From `Sub-20 2020 Apertura ED` WHERE ID = ?" , [ID])
       const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
   
       res.render('admined/edits20', {ediciones: ediciones[0], opciones:opciones})
           });
   ///edicion de las vistas
 router.post('/eds20edit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
   const {Jornada,Fecha,hora,Equipo,Rival,GF,GC,pt1,pt2} = req.body;
   const Regisedit = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo,
       Rival,
       GF,
       GC,
      Puntos: pt1
   };
   const Regisedit2 = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo :Rival,
       Rival: Equipo,
       GF: GC,
       GC: GF,
       Puntos: pt2
   };
   await pool.query("UPDATE `Sub-20 2020 Apertura ED` set ? Where id = ?",[Regisedit,ID]);
   await pool.query("INSERT INTO `Sub-20 2020 Apertura ED` set ?",[Regisedit2])
   
   res.redirect('/admin/eds20vista' )
   
           });
   
   /// editar goles liga ed
   
 router.get('/eds20goles',isLoggenIn, async  (req, res) => {
       const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
       const jugadores = await pool.query("SELECT * FROM `Registro Global Heroes`");
       const mixtagol = await pool.query("SELECT * FROM `ed_goleojor_sub20_a20` WHERE 1 GROUP by `ID_FB` ORDER BY `ed_goleojor_sub20_a20`.`Nombre_Equipo` ASC");
       const mixtagolind = await pool.query("SELECT * FROM `ed_goleojor_sub20_a20` ORDER BY `ed_goleojor_sub20_a20`.`id_registro` DESC");
   
       res.render('admined/goleos20' ,{ opciones , jugadores , mixtagol,mixtagolind})
       });
   
 router.post('/eds20goles',isLoggenIn, async  (req, res) => {
          console.log
          const {Jornada,Fecha,Hora,Equipo1,Rival,idl,idv,nam1,namv,dor1,dorv,gl,gv,id2,idv2,nam2,namv2,dor2,dorv2,gl2,gv2,idl3,idv3,naml3,namv3,dor3,dorv3,gl3,gv3} = req.body;
          const Regisedit = {
           id :idl,
           nombre :nam1,
           Dorsal:dor1,
           Equipo: Equipo1,
           Goles: gl,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv = {
           id :idv,
           nombre :namv,
           Dorsal:dorv,
           Equipo: Rival,
           Goles: gv,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
   
       const Regisedit2 = {
           id :id2,
           nombre :nam2,
           Dorsal:dor2,
           Equipo: Equipo1,
           Goles: gl2,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv2 = {
           id :idv2,
           nombre :namv2,
           Dorsal:dorv2,
           Equipo: Rival,
           Goles: gv2,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
       const Regisedit3 = {
           id :idl3,
           nombre :naml3,
           Dorsal:dor3,
           Equipo: Equipo1,
           Goles: gl3,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv3 = {
           id :idv3,
           nombre :namv3,
           Dorsal:dorv3,
           Equipo: Rival,
           Goles: gv3,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
   
       console.log(Regisedit)
       await pool.query("INSERT INTO `Goleo_ED_sub20_A20` set ?",[Regisedit])
       await pool.query("INSERT INTO `Goleo_ED_sub20_A20` set ?",[Regisedit2])
       await pool.query("INSERT INTO `Goleo_ED_sub20_A20` set ?",[Regisedit3])
   
       await pool.query("INSERT INTO `Goleo_ED_sub20_A20` set ?",[Regiseditv])
       await pool.query("INSERT INTO `Goleo_ED_sub20_A20` set ?",[Regiseditv2])
       await pool.query("INSERT INTO `Goleo_ED_sub20_A20` set ?",[Regisedit3])
   
          res.redirect('/admin/eds20goles' )
       });
   
 router.get('/eds20borrargoleadores/:ID',isLoggenIn, async  (req, res) => {
           const {ID} = req.params;
           console.log(ID);
    await pool.query("Delete From `Goleo_ED_sub20_A20` WHERE id_registro = ?" , [ID])
           res.redirect('/admin/eds20goles' )
               });
   
 router.get('/eds20editgoleadores/:ID',isLoggenIn, async  (req, res) => {
            const {ID} = req.params;
               console.log(ID)
    const ediciones = await pool.query("Select * From `Goleo_ED_sub20_A20` WHERE id_registro = ?" , [ID])
   
        res.render('admined/editgoleadoress20', {ediciones})
                   });
   
   
 router.post('/eds20ediciongoleadores/:ID',isLoggenIn, async  (req, res) => {
                       const {ID} = req.params;
   
                       const {Jornada,Fecha,hora,id,nombre,Equipo,Dorsal,Rival,Goles,id_registro} = req.body;
   
                       const editgol1 = {
                           Jornada ,
                           Fecha  ,
                           hora,
                           id,
                           nombre,
                           Equipo,
                           Dorsal,
                           Rival,
                           Goles
       
                       };
   
                       console.log(ID)
                       await pool.query("UPDATE `Goleo_ED_sub20_A20` set ? Where id_registro = ?",[editgol1,ID]);
   
                     res.redirect('/admin/eds20goles' )
                              });
   
////
////
////
////  FIN ENRUTAMIENTO CATEGORIA S20 
////
////
////
////
////

////
////
////
////  ENRUTAMIENTO CATEGORIA SUB-23
////
////
////
////
////





router.get('/eds23add',isLoggenIn, async (req, res) => {
    const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
    console.log(opciones)
        res.render('admined/adds23' , {opciones : opciones} )
    })


router.post('/eds23add',isLoggenIn, async (req, res) => {
    const {Jornada,Fecha,hora,Equipo,Rival,Equipo2,Rival2,Equipo3,Rival3,Equipo4,Rival4,Equipo5,Rival5,hora2,hora3,hora4,hora5} = req.body;
    const Regis1 = {
        Jornada ,
        Fecha  ,
        hora,
        Equipo,
        Rival,
    };
    
   const Regis3 = {
       Jornada ,
       Fecha  ,
       hora: hora2,
       Equipo : Equipo2,
       Rival: Rival2,
   };
   
   
   const Regis5 = {
       Jornada ,
       Fecha  ,
       hora : hora3,
       Equipo : Equipo3,
       Rival : Rival3
   };
   
   
   const Regis7 = {
      Jornada ,
      Fecha  ,
      hora : hora4 ,
      Equipo : Equipo4,
      Rival: Rival4,
   };
   
   const Regis9 = {
       Jornada ,
       Fecha  ,
       hora: hora5,
       Equipo : Equipo5,
       Rival: Rival5,
    };
    
   await pool.query("INSERT INTO `Sub-23 2020 Apertura ED` set ?",[Regis1])
   await pool.query("INSERT INTO `Sub-23 2020 Apertura ED` set ?",[Regis3])
   await pool.query("INSERT INTO `Sub-23 2020 Apertura ED` set ?",[Regis5])
   await pool.query("INSERT INTO `Sub-23 2020 Apertura ED` set ?",[Regis7])
   await pool.query('INSERT INTO `Sub-23 2020 Apertura ED` set ?',[Regis9])
   
   res.redirect('./eds23vista')
   })
   ///Ruta de formulario resultados de equipos
   
   
   
   ///Ruta de visualizacion de resultados
   router.get('/eds23vista',isLoggenIn, async  (req, res) => {
       const vistas = await pool.query("SELECT * FROM `ed_jor_sub23_a20` ORDER BY `ed_jor_sub23_a20`.`ID` DESC");
        res.render('admined/vistass23', { vistas } )
       });
   ///Ruta de visualizacion de resultados
   
   
   ///Ruta de eliminacion de resultados
   router.get('/eds23delete/:ID',isLoggenIn, async  (req, res) => {
   const {ID} = req.params;
   await pool.query("Delete From `Sub-23 2020 Apertura ED` WHERE ID = ?" , [ID])
       res.redirect('/admin/eds23vista' )
       });
   ///Ruta de eliminacion de resultados
   
   ///Edicion de las vistas
   router.get('/eds23edit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
       const ediciones = await pool.query("Select * From `Sub-23 2020 Apertura ED` WHERE ID = ?" , [ID])
       const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
   
       res.render('admined/edits23', {ediciones: ediciones[0], opciones:opciones})
           });
   ///edicion de las vistas
 router.post('/eds23edit/:ID',isLoggenIn, async  (req, res) => {
       const {ID} = req.params;
   const {Jornada,Fecha,hora,Equipo,Rival,GF,GC,pt1,pt2} = req.body;
   const Regisedit = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo,
       Rival,
       GF,
       GC,
      Puntos: pt1
   };
   const Regisedit2 = {
       Jornada ,
       Fecha  ,
       hora,
       Equipo :Rival,
       Rival: Equipo,
       GF: GC,
       GC: GF,
       Puntos: pt2
   };
   await pool.query("UPDATE `Sub-23 2020 Apertura ED` set ? Where id = ?",[Regisedit,ID]);
   await pool.query("INSERT INTO `Sub-23 2020 Apertura ED` set ?",[Regisedit2])
   
   res.redirect('/admin/eds23vista' )
   
           });
   
   /// editar goles liga ed
   
 router.get('/eds23goles',isLoggenIn, async  (req, res) => {
       const opciones = await pool.query("SELECT * FROM `Registros Global Equipo Heroes`");
       const jugadores = await pool.query("SELECT * FROM `Registro Global Heroes`");
       const mixtagol = await pool.query("SELECT * FROM `ed_goleojor_sub23_a20` WHERE 1 GROUP by `ID_FB` ORDER BY `ed_goleojor_sub23_a20`.`Nombre_Equipo` ASC");
       const mixtagolind = await pool.query("SELECT * FROM `ed_goleojor_sub23_a20` ORDER BY `ed_goleojor_sub23_a20`.`id_registro` DESC");
   
       res.render('admined/goleos23' ,{ opciones , jugadores , mixtagol,mixtagolind})
       });
   
 router.post('/eds23goles',isLoggenIn, async  (req, res) => {
          console.log
          const {Jornada,Fecha,Hora,Equipo1,Rival,idl,idv,nam1,namv,dor1,dorv,gl,gv,id2,idv2,nam2,namv2,dor2,dorv2,gl2,gv2,idl3,idv3,naml3,namv3,dor3,dorv3,gl3,gv3} = req.body;
          const Regisedit = {
           id :idl,
           nombre :nam1,
           Dorsal:dor1,
           Equipo: Equipo1,
           Goles: gl,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv = {
           id :idv,
           nombre :namv,
           Dorsal:dorv,
           Equipo: Rival,
           Goles: gv,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
   
       const Regisedit2 = {
           id :id2,
           nombre :nam2,
           Dorsal:dor2,
           Equipo: Equipo1,
           Goles: gl2,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv2 = {
           id :idv2,
           nombre :namv2,
           Dorsal:dorv2,
           Equipo: Rival,
           Goles: gv2,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
       const Regisedit3 = {
           id :idl3,
           nombre :naml3,
           Dorsal:dor3,
           Equipo: Equipo1,
           Goles: gl3,
           Jornada,
           Rival,
          Fecha,
          Hora
       };
       const Regiseditv3 = {
           id :idv3,
           nombre :namv3,
           Dorsal:dorv3,
           Equipo: Rival,
           Goles: gv3,
           Jornada,
           Rival:Equipo1,
          Fecha,
          Hora
       };
   
       console.log(Regisedit)
       await pool.query("INSERT INTO `Goleo_ED_sub23_A20` set ?",[Regisedit])
       await pool.query("INSERT INTO `Goleo_ED_sub23_A20` set ?",[Regisedit2])
       await pool.query("INSERT INTO `Goleo_ED_sub23_A20` set ?",[Regisedit3])
   
       await pool.query("INSERT INTO `Goleo_ED_sub23_A20` set ?",[Regiseditv])
       await pool.query("INSERT INTO `Goleo_ED_sub23_A20` set ?",[Regiseditv2])
       await pool.query("INSERT INTO `Goleo_ED_sub23_A20` set ?",[Regisedit3])
   
          res.redirect('/admin/eds23goles' )
       });
   
 router.get('/eds23borrargoleadores/:ID',isLoggenIn, async  (req, res) => {
           const {ID} = req.params;
           console.log(ID);
    await pool.query("Delete From `Goleo_ED_sub23_A20` WHERE id_registro = ?" , [ID])
           res.redirect('/admin/eds23goles' )
               });
   
 router.get('/eds23editgoleadores/:ID',isLoggenIn, async  (req, res) => {
            const {ID} = req.params;
               console.log(ID)
    const ediciones = await pool.query("Select * From `Goleo_ED_sub23_A20` WHERE id_registro = ?" , [ID])
   
        res.render('admined/editgoleadoress23', {ediciones})
                   });
   
   
 router.post('/eds23ediciongoleadores/:ID',isLoggenIn, async  (req, res) => {
                       const {ID} = req.params;
   
                       const {Jornada,Fecha,hora,id,nombre,Equipo,Dorsal,Rival,Goles,id_registro} = req.body;
   
                       const editgol1 = {
                           Jornada ,
                           Fecha  ,
                           hora,
                           id,
                           nombre,
                           Equipo,
                           Dorsal,
                           Rival,
                           Goles
       
                       };
   
                       console.log(ID)
                       await pool.query("UPDATE `Goleo_ED_sub23_A20` set ? Where id_registro = ?",[editgol1,ID]);
   
                     res.redirect('/admin/eds23goles' )
                              });
   
////
////
////
////  FIN ENRUTAMIENTO CATEGORIA S23 
////
////
////
////
////

module.exports = router