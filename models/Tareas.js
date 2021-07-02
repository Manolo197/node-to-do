const Tarea = require('./Tarea')

class Tareas 
{

    constructor()
    {
        this._listado= {};
    }

    borrarTarea(id='')
    {
        if(this._listado[id])
        {
            delete this._listado[id];
        }

    }
    

    cargarTareasfromJs(tareas=[])
    {
        tareas.forEach(tarea=>
            {
                this._listado[tarea.id]=tarea;
            })
    }


    get listaTareas()
    {
        const listado=[];

        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    crearTarea(desc='')
    {
        const tarea = new Tarea(desc);

        this._listado[tarea.id]= tarea;
    }

    listarTareas()
    {
        //1. Descripcion.

        // this.listaTareas.forEach(tarea=>
        //     {
        //         let i=1;
        //         console.log(`${i+'.'.green} ${this._listado[tarea.id]}`)
        //     })

        this.listaTareas.forEach((tarea, key)=>
            {
                console.log(`${JSON.stringify((key+1)).green}${'.'.green} ${this._listado[tarea.id].desc} | ${this._listado[tarea.id].completadoEn!==null?'Completado'.green:'Pendiente'.red}`);                
            })

    }

    listarCompletasOPendientes(completada=true)
    {
        let i=0;
        let o=0;

        this.listaTareas.forEach((tarea,key)=>
            {
                if(completada)
                {

                    if(this._listado[tarea.id].completadoEn)
                    {
                        i++
                        console.log(`${JSON.stringify(i).green}${'.'.green} ${this._listado[tarea.id].desc} | ${this._listado[tarea.id].completadoEn!==null?this._listado[tarea.id].completadoEn.green:'Pendiente'.red}`);
                    }
                    
                }
                else
                {
                    if(!this._listado[tarea.id].completadoEn)
                    {
                        o++
                        console.log(`${JSON.stringify(o).green}${'.'.green} ${this._listado[tarea.id].desc} | ${this._listado[tarea.id].completadoEn!==null?'Completado'.green:'Pendiente'.red}`);
                        
                    }
                }
            })
    }

    
    toggleCompletadas(idts= [] )
    {
        idts.forEach(idt=>
            {
                const tarea=this._listado[idt];
                if(!tarea.completadoEn)
                {
                    tarea.completadoEn= new Date().toISOString()
                }
            })

        this.listaTareas.forEach(tarea=>
            {
                if(!idts.includes(tarea.id))
                {
                    this._listado[tarea.id].completadoEn=null;
                }
            });
    }

}

module.exports= Tareas;