<?php

$encoding = "UTF-8";
mb_internal_encoding($encoding);
mb_http_output($encoding);

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

                    $results = $con -> query("SELECT {$sentenceFields} FROM {$data['table']} WHERE {$data['where']};");

                    $response = [];
                    while($row = $results -> fetch_assoc()){
                        array_push($response, $row);
                    }

                    $con -> close();

                    return $response;

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

                    $con -> close();

                    return $response;

                }
            }else{

                // Valida que exista una condicion where
                if(array_key_exists($where, $data)){

                    $results = $con -> query("SELECT * FROM {$data['table']} WHERE {$data['where']}");

                    $response = [];
                    while($row = $results -> fetch_assoc()){
                        array_push($response, $row);
                    }

                    $con -> close();

                    return $response;

                }else{

                    $results = $con -> query("SELECT * FROM {$data['table']}");

                    $response = [];
                    while($row = $results -> fetch_assoc()){
                        array_push($response, $row);
                    }

                    $con -> close();

                    return $response;

                }
            }
        }else{

            return 0;
        }
    }

    public function insert($data){
        $table = 'table';
        $fields = 'fields';

        $con = $this->connect();

        // Valida que exista una tabla para hacer el select
        if(array_key_exists($table, $data)){

            // Valida que existan campos de consulta (en caso de que no existan se ejecutara un select all)
            if(array_key_exists($fields, $data)){

                $insertFields = [];
                $valuesFields = [];

                foreach ($data['fields'] as $key => $value){
                    array_push($insertFields, $key);
                    array_push($valuesFields, $value);
                }

                $numFields = count($insertFields);
                $strInsertFields = "";
                $strValuesField = "";

                for($i = 0; $i < $numFields; $i++){
                    if($i == $numFields - 1){
                        $strInsertFields .= $insertFields[$i];
                        $strValuesField .= "'" . $valuesFields[$i] . "'";
                    }else{
                        $strInsertFields .= $insertFields[$i] . ", ";
                        $strValuesField .= "'" . $valuesFields[$i] . "', ";
                    }
                }

                $sql = "INSERT INTO {$data['table']} ({$strInsertFields}) VALUES ({$strValuesField})";

                $result = $con -> query($sql);

                if($result){

                    $con -> close();
                    return 1;
                }else{

                    $con -> close();
                    return "error when trying to insert the record in the database";
                }

            }else{

                $con -> close();
                return "error, missing fields field";
            }
        }else{

            $con -> close();
            return "error, missing table field";
        }

    }

    public function delete($data){

    }

    public function update($data){

    }

}