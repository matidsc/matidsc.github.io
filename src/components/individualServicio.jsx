import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/ServicioIndividual.css";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Galeria from "./galería";
import NotFound from "../Pages/NotFound";
import PageWrapper from "../containers/pageWrapper";
const IndividualServicio = () => {
  const [showMore, setShowMore] = useState(false);
  const paragraphh = useRef();
  const [servicio, setServicio] = useState({});
  const { idServicio, idSubservicio } = useParams();
  const [imagenes, setImagenes] = useState([]);
  useEffect(() => {
    fetch(
      idSubservicio
        ? `https://api.marcebaniziestudio.com/servicios/subservicios/${idSubservicio}`
        : `https://api.marcebaniziestudio.com/servicios/${idServicio}`
    )
      .then((res) => res.json())
      .then((result) => setServicio(result));
    fetch(
      idSubservicio
        ? `https://api.marcebaniziestudio.com/servicios/subservicios/${idSubservicio}/imagenes`
        : `https://api.marcebaniziestudio.com/servicios/${idServicio}/imagenes`
    )
      .then((imgs) => imgs.json())
      .then((imagenes) => setImagenes(imagenes));
  }, [idServicio, idSubservicio]);
  return (
    
      Object.keys(servicio).length!==0 ? 

    <PageWrapper xAnimation={false}>
        <div className="wrapperIndividualServicio">
          <Galeria imageList={imagenes} />

          <div className="wrapperDetallesServicio">
            <h1>{servicio.nombre}</h1>
            {servicio.precio !== 0 && <h3>${servicio.precio}</h3>}
            <h2>En qué consiste? </h2>
            <div
              ref={paragraphh}
              className={showMore ? "paragraph" : "paragraph infoHide"}
            >
              <p>
                {separador(
                  typeof servicio.descripcion !== "undefined"
                    ? servicio.descripcion
                    : ""
                )}
              </p>
            </div>
            <button
              onClick={() => {
                setShowMore(!showMore);
                paragraphh.current.scrollTop = 0;
              }}
              className="showMore"
            >
              {showMore ? "Mostrar menos" : "Mostrar más"}
            </button>

            <a
              rel="noreferrer"
              target="_blank"
              href={
                "https://wa.me/59895457744/?text=Hola, quisiera consultarte sobre el servicio de " +
                servicio.nombre
              }
            >
              <button className="btnFlotante">
                <AiOutlineWhatsApp size="40" className="iconFooter" />
                Consultame sobre el servicio
              </button>
            </a>
          </div>
        </div>
       
    </PageWrapper>
    : 
      <NotFound ruta={'/'} mensaje='Servicio no encontrado' boton='Volver al inicio'/>
    
  );
};
function separador(descripcion) {
  return descripcion.split(".").join("." + "\n");
}
export default IndividualServicio;