<?php
include_once 'conexion.php';
session_start();
new acionesaxio();

class acionesaxio{
    private $pdo=null;
    private $data=null;
    public function __construct()
    {
        $this->data=json_decode(file_get_contents("php://input"));
        if(!isset( $this->data->accion)|| !method_exists($this, $this->data->accion)){
            echo "no se encontro la funcion o la accion";
            exit;
        }

        $this->pdo=(new conexionphp())->pdo;   
        call_user_func([$this, $this->data->accion]);   
    }
    public  function crearusuario(){
        try{
            $comando=$this->pdo->prepare("INSERT INTO usuarios (nombre, telefono, contrasena) values (?,?,?)");
            $comando->execute([$this->data->usuario ,$this->data->telefono, $this->data->contrasena]);
            
            if($comando->rowCount()>0){
                echo "se puso un usuario con exito";
            }else{
                echo "se puso un dsdsusuario con exito";
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    public function buscartelefono(){
        try{
            $comando=$this->pdo->prepare("SELECT telefono FROM usuarios where telefono=?");
            $comando->execute([$this->data->telefono]);
            if($comando->rowCount()>0){
                echo "telefonodublicado";
                return 1;
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    public function iniciarsesion(){
        try{
            $comando=$this->pdo->prepare("SELECT * FROM usuarios WHERE telefono=? and contrasena=?");
            $comando->execute([$this->data->telefono, $this->data->contrasena]);
            if($comando->rowCount()>0){
                $resultados= $comando->fetchAll(PDO::FETCH_ASSOC);
                foreach($resultados as $resultadosbd){
                $_SESSION['telefono']= $resultadosbd['telefono'];
                $_SESSION['nombre']= $resultadosbd['nombre'];
                $_SESSION['usuario']= $resultadosbd['id_usuario'];
                $_SESSION['contrasena']= $resultadosbd['contrasena'];
                
                }
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    public function busquedacontacto(){
        try{
            $comando=$this->pdo->prepare("SELECT * FROM usuarios where telefono=?");
            $comando->execute([$this->data->busqueda]);
            echo json_encode($comando->fetchAll(PDO::FETCH_ASSOC)) ;
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    public function mandarmensajes(){
        try{
            $comando=$this->pdo->prepare("SELECT * FROM amigos WHERE (id_usuario2=? and id_usuario1=?) or (id_usuario2=? and id_usuario1=?) ");
            $comando->execute([$this->data->enviado_por, $this->data->remitente, $this->data->remitente,$this->data->enviado_por]);
            if($comando->rowCount()>0){
                
                echo $this->pdo->prepare("INSERT into mensajes(enviado_por, remitente, mensaje, leido_o_no) values (?,?,?,?)")->execute([$this->data->enviado_por, $this->data->remitente, $this->data->mensaje, $this->data->leido_o_no]);
            }else{
                
                echo $this->pdo->prepare("INSERT into mensajes(enviado_por, remitente, mensaje, leido_o_no) values (?,?,?,?)")->execute([$this->data->enviado_por, $this->data->remitente, $this->data->mensaje, $this->data->leido_o_no])&& $this->pdo->prepare("INSERT into amigos(id_usuario1, id_usuario2) values (?,?)")->execute([$this->data->enviado_por, $this->data->remitente]);
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    public function traermensajes(){
        try{
            $comando=$this->pdo->prepare("SELECT *FROM mensajes where (enviado_por=? and remitente=?) or (enviado_por=? and remitente=?) ");
            $comando->execute([$this->data->usuario, $this->data->remitente, $this->data->remitente,$this->data->usuario]);
            if($comando->rowCount()>0){
                if($this->pdo->prepare("UPDATE mensajes set leido_o_no=1 where enviado_por=? and remitente=?")->execute([$this->data->remitente,$this->data->usuario])){

                    echo json_encode( $comando->fetchAll(PDO::FETCH_ASSOC));
                }

            }else{
                echo 0;
            }
            
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    public function traer_amgos(){
        try {
            $comando = $this->pdo->prepare("SELECT u.*
FROM amigos a
JOIN usuarios u ON (a.id_usuario1 = u.id_usuario OR a.id_usuario2 = u.id_usuario)
WHERE (a.id_usuario1 = ? OR a.id_usuario2 = ?)
AND u.id_usuario != ?
");
            $comando->execute([$this->data->usuario, $this->data->usuario,$this->data->usuario]);
            echo $comando->rowCount() > 0 ? json_encode($comando->fetchAll(PDO::FETCH_ASSOC)) : 0;
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        
    }
    public function buscar_mensajes(){
        try{
            $comando=$this->pdo->prepare("SELECT enviado_por, COUNT(*) as cantidad_no_leidos 
                                from mensajes 
                                WHERE leido_o_no = 0 AND remitente = ? 
                                GROUP BY enviado_por");
            $comando->execute([$this->data->usuario]);
            echo $comando->rowCount()>0 ? json_encode($comando->fetchAll(PDO::FETCH_ASSOC)):0;
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    
}

?>