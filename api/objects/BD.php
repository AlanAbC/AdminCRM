<?php

class BD{

    private $host = 'localhost';
    private $user = 'root';
    private $password = '';
    private $db = 'sistemas_integrados';

    private function connect(){
        $connection = new mysqli($this->host, $this->user, $this->password, $this->db);

        if($connection->connect_errno){
            print("Fallo al conectar a MySQL: (" . $connection->connect_errno . ") " . $connection->connect_error);
        }else{
            return $connection;
        }
    }

    public function select($data){
        $table = 'table';
        $fields = 'fields';
        $where = 'where';

        $con = $this->connect();

        // Valida que exista una tabla para hacer el select
        if(array_key_exists($table, $data)){

            // Valida que existan campos de consulta (en caso de que no existan se ejecutara un select all)
            if(array_key_exists($fields, $data)){

                // Valida que exista una condicion where
                if(array_key_exists($where, $data)){

                    $sentenceFields = "";
                    for($i = 0; $i < count($data['fields']); $i++){
                        if($i == count($data['fields']) - 1){
                            $sentenceFields .= $data['fields'][$i];
                        }else{
                            $sentenceFields .= $data['fields'][$i] . ', ';
                        }
                    }
                    print("SELECT {$sentenceFields} FROM {$data['table']} WHERE {$data['where']};");

                    $results = $con -> query("SELECT {$sentenceFields} FROM {$data['table']} WHERE {$data['where']};");

                    $response = [];
                    while($row = $results -> fetch_assoc()){
                        array_push($response, $row);
                    }

                    return json_encode($response);

                }else{

                    $sentenceFields = "";
                    for($i = 0; $i < count($data['fields']); $i++){
                        if($i == count($data['fields']) - 1){
                            $sentenceFields .= $data['fields'][$i];
                        }else{
                            $sentenceFields .= $data['fields'][$i] . ', ';
                        }
                    }

                    $results = $con -> query("SELECT {$sentenceFields} FROM {$data['table']}");

                    $response = [];
                    while($row = $results -> fetch_assoc()){
                        array_push($response, $row);
                    }

                    return json_encode($response);

                }
            }else{

                // Valida que exista una condicion where
                if(array_key_exists($where, $data)){

                    $results = $con -> query("SELECT * FROM {$data['table']} WHERE {$data['where']}");

                    $response = [];
                    while($row = $results -> fetch_assoc()){
                        array_push($response, $row);
                    }

                    return json_encode($response);

                }else{

                    $results = $con -> query("SELECT * FROM {$data['table']}");

                    $response = [];
                    while($row = $results -> fetch_assoc()){
                        array_push($response, $row);
                    }

                    return json_encode($response);

                }
            }
        }else{

            return 0;
        }
    }

    public function insert($data){

    }

    public function delete($data){

    }

    public function update($data){

    }

}