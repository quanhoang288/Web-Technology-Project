<?php

namespace MVC;

class Model {

    /**
     * @var
     */
	protected $_describe = array();
    protected $_db;
    protected $_result;
    protected $_query;
    protected $_table;
    protected $_orderBy;
	protected $_order;
    protected $_extraConditions;
    protected $_hO;
    protected $_hM;
    protected $_hMABTM;

    /**
     *  Construct
     */
    public function __construct() {
        $this->_db = new \Database\DatabaseAdapter(
            DATABASE['Driver'],
            DATABASE['Host'],
            DATABASE['User'],
            DATABASE['Pass'],
            DATABASE['Name'],
            DATABASE['Port']    
        );
        

        
        $this->_table = str_replace('models','',strtolower(get_class($this)));        
		$this->_describe();
		
    }

	public function setAtrributes($arr){
		foreach($arr as $key=>$value){
			$this->$key = $value;
		}
	}
    public function showHasOne(){
        $this->_hO = 1;
    }
    public function showHasMany(){
        $this->_hM = 1;
    }
    public function showHMABTM(){
        $this->_hMABTM = 1;
    }
    function where($field, $value) {
		$this->_extraConditions .= '`'.$this->_table.'`.`'.$field.'` = \''.$this->_db->escape($value).'\' AND ';
	}

	function like($field, $value) {
		$this->_extraConditions .= '`'.$this->_table.'`.`'.$field.'` LIKE \'%'.$this->_db->escape($value).'%\' AND ';
	}

	function orderBy($orderBy, $order = 'ASC') {
		$this->_orderBy = $orderBy;
		$this->_order = $order;
	}

    public function search(){
		$from = '`'.$this->_table.'`' ;
		$conditions = '\'1\'=\'1\' AND ';
		$conditionsChild = '';
		$fromChild = '';
        if ($this->_hO == 1 && isset($this->hasOne)) {
			
			foreach ($this->hasOne as $model=>$foreignKey) {
				// $table = strtolower($model);
				$from .= ' LEFT JOIN `'.$model.'`';
				$from .= ' ON `'.$this->_table.'`.`'.$foreignKey .'` = `'.$model.'`.id  ';
			}
		}
        
		if ($this->id) {
			$conditions .= '`'.$this->_table.'`.`id` = \''.$this->_db->escape($this->id).'\' AND ';
		}

		if ($this->_extraConditions) {
			$conditions .= $this->_extraConditions;
		}

		$conditions = substr($conditions,0,-4);
		
		if (isset($this->_orderBy)) {
			$conditions .= ' ORDER BY `'.$this->_table.'`.`'.$this->_orderBy.'` '.$this->_order;
		}


		
		$this->_query = 'SELECT * FROM '.$from.' WHERE '.$conditions;
		echo '<!--'.$this->_query.'-->' . PHP_EOL;
		$this->_result = $this->_db->query($this->_query);
		$result = array();
		$table = array();
		$field = array();
		$tempResults = array();
		$numOfFields = $this->_result->columnCount();
		for ($i = 0; $i < $numOfFields; ++$i) {
		    array_push($table,$this->_result->getColumnMeta($i)['table']);
		    array_push($field,$this->_result->getColumnMeta($i)['name']);
		}

        $countSQL = 'SELECT COUNT(*) FROM '.$from.' WHERE '.$conditions;
        $res = $this->_db->query($countSQL);
        $num_rows = $res->fetchColumn();
		if ($num_rows > 0 ) {
			while ($row = $this->_result->fetch(\PDO::FETCH_NUM)) {
				for ($i = 0;$i < $numOfFields; ++$i) {
					$tempResults[$table[$i]][$field[$i]] = $row[$i];
					
				}

				if ($this->_hM == 1 && isset($this->hasMany)) {
					foreach ($this->hasMany as $childTable => $foreignKey) {
						$queryChild = '';
						$conditionsChild = '';
						$fromChild = '';

						// $tableChild = strtolower($modelChild);
						// $pluralAliasChild = strtolower($aliasChild);
						// $singularAliasChild = strtolower($aliasChild);

						$fromChild .= '`'.$childTable.'`';
						
						$conditionsChild .= '`'.$foreignKey.'` = \''.$tempResults[$this->_table]['id'].'\'';
	
						$queryChild =  'SELECT * FROM '.$fromChild.' WHERE '.$conditionsChild;	
						echo '<!--'.$queryChild.'-->' . PHP_EOL;
						$resultChild = $this->_db->query($queryChild);
				
						$tableChild = array();
						$fieldChild = array();
						$tempResultsChild = array();
						$resultsChild = array();
                        $countSQL = 'SELECT COUNT(*) FROM '.$fromChild.' WHERE '.$conditionsChild;
                        $res = $this->_db->query($countSQL);
                        $num_rows = $res->fetchColumn();
						if ($num_rows > 0) {
							// echo "has many!" . PHP_EOL;
							$numOfFieldsChild = $resultChild->columnCount();
							for ($j = 0; $j < $numOfFieldsChild; ++$j) {
								array_push($tableChild, $resultChild->getColumnMeta($j)['table']);
								array_push($fieldChild, $resultChild->getColumnMeta($j)['name']);
							}

							while ($rowChild = $resultChild->fetch(\PDO::FETCH_NUM)) {
								for ($j = 0;$j < $numOfFieldsChild; ++$j) {
									// echo $rowChild[$j] . PHP_EOL;
									// $tempResultsChild[$tableChild[$j]][$fieldChild[$j]] = $rowChild[$j];
									$tempResultsChild[$fieldChild[$j]] = $rowChild[$j];
								}
								
								array_push($resultsChild,$tempResultsChild);
							}
						}
						
						$tempResults[$childTable] = $resultsChild;
						
						// $resultChild->free_result();
					}
				}


				if ($this->_hMABTM == 1 && isset($this->hasManyAndBelongsToMany)) {
					foreach ($this->hasManyAndBelongsToMany as $childTable=>$joinTable) {
						$queryChild = '';
						$conditionsChild = '';
						$fromChild = '';

						// $tableChild = strtolower($tableChild);
						// $pluralAliasChild = strtolower($inflect->pluralize($aliasChild));
						// $singularAliasChild = strtolower($aliasChild);

						// $sortTables = array($this->_table,$tableChild);
						// sort($sortTables);
						// $joinTable = implode('_',$sortTables);

						$fromChild .= '`'.$childTable.'`, ';
						$fromChild .= '`'.$joinTable.'`,';
						
						$conditionsChild .= '`'.$joinTable.'`.`'.$childTable.'_id` = `'.$childTable.'`.`id` AND ';
						$conditionsChild .= '`'.$joinTable.'`.`'.strtolower($this->_table).'_id` = \''.$tempResults[$this->_table]['id'].'\'';
						$fromChild = substr($fromChild,0,-1);

						$queryChild =  'SELECT * FROM '.$fromChild.' WHERE '.$conditionsChild;	
						
						echo '<!--'.$queryChild.'-->' . PHP_EOL;
						$resultChild = $this->_db->query($queryChild);
				
						$tableChildArr = array();
						$fieldChildArr = array();
						$tempResultsChild = array();
						$resultsChild = array();
                        $countSQL = 'SELECT COUNT(*) FROM '.$fromChild.' WHERE '.$conditionsChild;
						// echo '<!--'.$countSQL.'-->';
                        $res = $this->_db->query($countSQL);
                        $num_rows = $res->fetchColumn();
						if ($num_rows > 0) {
							// echo "has many and belongs to many!" . PHP_EOL;
							$numOfFieldsChild = $resultChild->columnCount();
							for ($j = 0; $j < $numOfFieldsChild; ++$j) {
								array_push($tableChildArr, $resultChild->getColumnMeta($j)['table']);
								array_push($fieldChildArr, $resultChild->getColumnMeta($j)['name']);
							}

							while ($rowChild = $resultChild->fetch(\PDO::FETCH_NUM)) {
								for ($j = 0;$j < $numOfFieldsChild; ++$j) {
									$tempResultsChild[$tableChildArr[$j]][$fieldChildArr[$j]] = $rowChild[$j];
									// $tempResultsChild[$fieldChildArr[$j]] = $rowChild[$j];
								}
								array_push($resultsChild,$tempResultsChild);
							}
						}
						
						$tempResults[$childTable] = $resultsChild;
						
					}
					// var_dump($tempResults);

				}
				
				array_push($result, $tempResults);
				
			}

			if ($num_rows == 1 && $this->id != null) {
				$this->clear();
				return($result[0]);
			} else {
	
				$this->clear();
				return $result;
			}
		} else {
			$this->clear();
			return $result;
		}

	

    }
    protected function _describe() {
		global $cache;

		$this->_describe = $cache->get('describe'.$this->_table);

		if (!$this->_describe) {
			$this->_describe = array();
			$query = 'DESCRIBE '.$this->_table;
			$this->_result = $this->_db->query($query);
			while ($row = $this->_result->fetch(\PDO::FETCH_NUM)) {
				 array_push($this->_describe,$row[0]);
			}

			$cache->set('describe'.$this->_table,$this->_describe);
		}

		foreach ($this->_describe as $field) {
			$this->$field = null;
		}
	}


    public function save(){
        $query = '';
		if (isset($this->id)) {
			$updates = '';
			foreach ($this->_describe as $field) {
				if (isset($this->$field)) {
					
					$updates .= '`'.$field.'` = \''.$this->_db->escape($this->$field).'\',';
				}
			}

			$updates = substr($updates,0,-1);

			$query = 'UPDATE '.$this->_table.' SET '.$updates.' WHERE `id`= ' . $this->id;			
		} else {
		
			$fields = '';
			$values = '';
			foreach ($this->_describe as $field) {
				
				if (isset($this->$field)) {
					
					$fields .= '`'.$field.'`,';
					$values .= '\''.$this->_db->escape($this->$field).'\',';
				}
			}
			$values = substr($values,0,-1);
			$fields = substr($fields,0,-1);

			$query = 'INSERT INTO '.$this->_table.' ('.$fields.') VALUES ('.$values.')';
		
		}
		echo $query . PHP_EOL;
        $stmt = $this->_db->prepare($query);
		$this->_result = $stmt->execute();

		$this->clear();

		if (!$this->_result) {
			
			return false;
        }
		return true;
    }
    public function delete(){
        if ($this->id) {
            if (isset($this->hasMany)){
                
                foreach($this->hasMany as $tableChild => $foreignKey){
                    $queryChild = '';
                    $conditionsChild = '';
                    $fromChild = '';
             
					
                    $conditionsChild .= '`'.$foreignKey.'` = '.$this->id;

                    $queryChild = 'DELETE FROM ' . $tableChild . ' WHERE ' . $conditionsChild ;
					echo $queryChild . PHP_EOL;
                    $stmt = $this->_db->prepare($queryChild);
                    $this->_result = $stmt->execute();
                    if (!$this->_result){
						echo "error delete child row!" . PHP_EOL;
                        return false;
                    }
                }
            }
            if (isset($this->hasManyAndBelongsToMany)){
                foreach ($this->hasManyAndBelongsToMany as $tableChild=>$joinTable) {
                    $queryChild = '';
                    $conditionsChild = '';
                    $fromChild = '';

                    // $tableChild = strtolower($tableChild);


                    // $sortTables = array($this->_table,$tableChild);
                    // sort($sortTables);
                    // $joinTable = implode('_',$sortTables);
                    
                    $fromChild .= '`'.$joinTable.'`';
                    $conditionsChild .= '`'.strtolower($this->_table).'_id` = '.$this->id;
                    $queryChild =  'DELETE  FROM '.$fromChild.' WHERE '.$conditionsChild;	

                    $stmt = $this->_db->prepare($queryChild);
					echo $queryChild;
                    $this->_result = $stmt->execute();
                    if (!$this->_result){
                        return false;
                    }
                }
            }
			$query = 'DELETE FROM '.$this->_table.' WHERE `id`='.$this->id;	
            $stmt = $this->_db->prepare($query);	
			$this->_result = $stmt->execute();
			$this->clear();
			
			if (!$this->_result) {
				
			    /** Error Generation **/
				return false;
		    }
            return true;
		} else {
			/** Error Generation **/
			return false;
		}
    }
    public function clear() {
		foreach($this->_describe as $field) {
			$this->$field = null;
		}
		$this->_orderby = null;
		$this->_extraConditions = null;
		$this->_hO = null;
		$this->_hM = null;
		$this->_hMABTM = null;
		$this->_order = null;
	}

    // public function all(){
    //     $stmt = $this->db->prepare('select * from '.$this->_table);
    //     $stmt->execute();
    //     return json_encode($stmt->fetchAll(\PDO::FETCH_NAMED));

    // }
   


}

