<?php

class Estadistics{

    private $id;
    private $clientsTotals;
    private $purchasesTotals;
    private $registerDate;

    /**
     * Estadistics constructor.
     * @param $id
     * @param $clientsTotals
     * @param $purchasesTotals
     * @param $registerDate
     */
    public function __construct($id, $clientsTotals, $purchasesTotals, $registerDate)
    {
        $this->id = $id;
        $this->clientsTotals = $clientsTotals;
        $this->purchasesTotals = $purchasesTotals;
        $this->registerDate = $registerDate;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getClientsTotals()
    {
        return $this->clientsTotals;
    }

    /**
     * @param mixed $clientsTotals
     */
    public function setClientsTotals($clientsTotals)
    {
        $this->clientsTotals = $clientsTotals;
    }

    /**
     * @return mixed
     */
    public function getPurchasesTotals()
    {
        return $this->purchasesTotals;
    }

    /**
     * @param mixed $purchasesTotals
     */
    public function setPurchasesTotals($purchasesTotals)
    {
        $this->purchasesTotals = $purchasesTotals;
    }

    /**
     * @return mixed
     */
    public function getRegisterDate()
    {
        return $this->registerDate;
    }

    /**
     * @param mixed $registerDate
     */
    public function setRegisterDate($registerDate)
    {
        $this->registerDate = $registerDate;
    }

}