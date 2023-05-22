// Procesos de la CPU
const procesos = [
    { proceso: 'p1', tl: 0, tr: 8 },
    { proceso: 'p2', tl: 3, tr: 4 },
    { proceso: 'p3', tl: 6, tr: 2 },
    { proceso: 'p4', tl: 10, tr: 3 },
    { proceso: 'p5', tl: 15, tr: 6 }
  ];
  
  // Calcula tiempo total
  const tiempoTotal = procesos.reduce((total, proceso) => total + proceso.tr, 0);
  
  function SRTF(procesos = []) {
    let tiempoActual = 0;
    let tiempoEspera = 0;
    let resultado = [];
    let procesoAnterior = null; // Almcena el proceso anteriormente ejecutado
  
    while (procesos.length > 0) {
      // Añade a la cola procesos que ya hayan llegado
      let colaDeProcesos = procesos.filter(proceso => proceso.tl <= tiempoActual);
  
      if (colaDeProcesos.length > 0) {
        let procesoActual = colaDeProcesos.reduce((anterior, actual) => actual.tr < anterior.tr ? actual : anterior);
  
        // Verifica si el proceso actual es diferente al proceso anterior
        if (procesoActual !== procesoAnterior) {
          let tiempoEspera = 0;

          if( procesoActual.tl == 0){
             tiempoEspera += tiempoActual -3;
          }else{
            tiempoEspera += (tiempoActual - procesoActual.tl) + .2 ;
          }
          
          resultado.push( {p:procesoActual.proceso,tiempoInicio:tiempoActual,tiempoEspera}); // Agrega el proceso al arreglo resultado
          procesoAnterior = procesoActual; // Actualiza el proceso anterior con el proceso actual
        }
  
        procesoActual.tr--; // Reudicemos tr = tiempo restant
  
        if (procesoActual.tr === 0) { // Si se acabo el tr lo podemos sacar de la cola de procesos
          procesos.splice(procesos.indexOf(procesoActual), 1);
        }
      }
  
      tiempoActual++;
      // console.log(tiempoActual);
    }
  
    console.log('Resultado de la planificación SRTF:', resultado);
    console.log('Tiempo total:', tiempoTotal);
  }
  
  SRTF(procesos);


