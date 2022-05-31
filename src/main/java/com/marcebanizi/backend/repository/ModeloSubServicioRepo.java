package com.marcebanizi.backend.repository;

import com.marcebanizi.backend.model.ModeloSubServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ModeloSubServicioRepo extends JpaRepository<ModeloSubServicio, Integer> {
   @Query(
           value = "select ids, id, nombre, descripcion, precio from subservicio_cat_bck",
           nativeQuery = true)
   List<ModeloSubServicio> getSubServicios();
   @Query(
           value = "select ids, id, nombre, descripcion, precio from subservicio_cat_bck where ids = ?1",
           nativeQuery = true)
   ModeloSubServicio getSubServiciosId(Long id);
   @Query(
           value = "select ids, nombre, descripcion, precio from subservicio_cat_bck where id = ?1",
           nativeQuery = true)
   List<ModeloSubServicio> getSubServiciosSegunServicio(Long id);
}