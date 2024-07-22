<?php
class conexionphp{
    private $usuario="root";
    private $contrasena="";
    public $pdo=null;
    public function __construct(){
        try{
            $this->pdo=new PDO("mysql: host=localhost; dbname=telefoniasa;", $this->usuario,$this->contrasena);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
}
?>