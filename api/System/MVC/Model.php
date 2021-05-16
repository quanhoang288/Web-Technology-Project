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
    public function __construct($childClass=null) {
        $this->_db = new \Database\DatabaseAdapter(
            DATABASE['Driver'],
            DATABASE['Host'],
            DATABASE['User'],
            DATABASE['Pass'],
            DATABASE['Name'],
            DATABASE['Port']    
        );

		if (!$childClass){
			$this->_table = str_replace('model','',strtolower(get_class($this))); 
			
		}
		else{

			$this->_table = str_replace('model','',strtolower($childClass)); 
			 
		}
        
		$this->_describe();
		
    }

	public function setAtrributes($arr){
		foreach($arr as $key=>$value){
			// echo $key . ': ' . $value . PHP_EOL; 
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
			
			foreach ($this->hasOne as $alias=>$model) {
				// $table = strtolower($model);
				$from .= ' LEFT JOIN `'.$model.'` AS ' . '`'.$alias.'`';
				$from .= ' ON `'.$this->_table.'`.`'.$alias .'_id' .'` = `'.$alias.'`.id  ';
			}
		}
        
		if (isset($this->id)) {
			$conditions .= '`'.$this->_table.'`.`id` = \''.$this->_db->escape($this->id).'\' AND ';
		}

		if (isset($this->_extraConditions)) {
			$conditions .= $this->_extraConditions;
		}

		$conditions = substr($conditions,0,-4);
		
		if (isset($this->_orderBy)) {
			$conditions .= ' ORDER BY `'.$this->_table.'`.`'.$this->_orderBy.'` '.$this->_order;
		}


		
		$this->_query = 'SELECT * FROM '.$from.' WHERE '.$conditions;
		// echo '<!--'.$this->_query.'-->' . PHP_EOL;

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
					foreach ($this->hasMany as $aliasChild => $childTable) {
						$queryChild = '';
						$conditionsChild = '';
						$fromChild = '';

						// $tableChild = strtolower($modelChild);
						// $pluralAliasChild = strtolower($aliasChild);
						// $singularAliasChild = strtolower($aliasChild);

						$fromChild .= '`'.$childTable.'` AS' . '`' . $aliasChild . '`';
						
						$conditionsChild .= $this->_table.'_id = ' . $tempResults[$this->_table]['id'];
	
						$queryChild =  'SELECT * FROM '.$fromChild.' WHERE '.$conditionsChild;	
						// echo '<!--'.$queryChild.'-->' . PHP_EOL;
						$resultChild = $this->_db->query($queryChild);
				
						$tableChildArr = array();
						$fieldChildArr = array();
						$tempResultsChild = array();
						$resultsChild = array();
                        $countSQL = 'SELECT COUNT(*) FROM '.$fromChild.' WHERE '.$conditionsChild;
						// echo $countSQL . PHP_EOL;
                        $res = $this->_db->query($countSQL);
                        $num_rows = $res->fetchColumn();
						if ($num_rows > 0) {
							// echo "has many!" . PHP_EOL;
							$numOfFieldsChild = $resultChild->columnCount();
							for ($j = 0; $j < $numOfFieldsChild; ++$j) {
								array_push($tableChildArr, $resultChild->getColumnMeta($j)['table']);
								array_push($fieldChildArr, $resultChild->getColumnMeta($j)['name']);
							}

							while ($rowChild = $resultChild->fetch(\PDO::FETCH_NUM)) {
								for ($j = 0;$j < $numOfFieldsChild; ++$j) {
									// echo $rowChild[$j] . PHP_EOL;
									// $tempResultsChild[$tableChild[$j]][$fieldChild[$j]] = $rowChild[$j];
									$tempResultsChild[$fieldChildArr[$j]] = $rowChild[$j];
								}
								
								array_push($resultsChild,$tempResultsChild);
							}
						}
						
						$tempResults[$aliasChild] = $resultsChild;
						
						// $resultChild->free_result();
					}
				}


				if ($this->_hMABTM == 1 && isset($this->hasManyAndBelongsToMany)) {
					foreach ($this->hasManyAndBelongsToMany as $aliasChild=>$childTable) {
						$queryChild = '';
						$conditionsChild = '';
						$fromChild = '';
						// $select = '`' . $aliasChild . '`' . '.*';
				
						// $tableChild = strtolower($tableChild);
						// $pluralAliasChild = strtolower($inflect->pluralize($aliasChild));
						// $singularAliasChild = strtolower($aliasChild);

						$sortTables = array($this->_table, $aliasChild);
						sort($sortTables);
						$joinTable = implode('_',$sortTables);
						
						$fromChild .= '`'.$childTable.'`AS `' . $aliasChild .'`, ';
						$fromChild .= '`'.$joinTable.'`,';
						

						 
						$conditionsChild .= '`'.$joinTable.'`.`'.$aliasChild.'_id` = `'.$aliasChild.'`.`id` AND ';
						// if (isset($this->childID))
						// 	$conditionsChild .= '`'.$joinTable.'`.`'.$aliasChild.'_id` = '. $this->childID . ' AND ';
						$conditionsChild .= '`'.$joinTable.'`.`'.strtolower($this->_table).'_id` = \''.$tempResults[$this->_table]['id'].'\'';
						$fromChild = substr($fromChild,0,-1);

						$queryChild =  'SELECT * FROM '.$fromChild.' WHERE '.$conditionsChild;	
						
						// echo '<!--'.$queryChild.'-->' . PHP_EOL;
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
								$joinResult = array();
								$childFK = $aliasChild . '_id';
								$tableFK = $this->_table . '_id';
								// echo $childFK . ' - ' . $tableFK . PHP_EOL;
								for ($j = 0;$j < $numOfFieldsChild; ++$j) {
									if ($tableChildArr[$j] == $aliasChild){
										$tempResultsChild[$fieldChildArr[$j]] = $rowChild[$j];
									}
									else if ($fieldChildArr[$j] != $childFK && $fieldChildArr[$j] != $tableFK){
										$joinResult[$fieldChildArr[$j]] = $rowChild[$j];
									}
				
									// $tempResultsChild[$tableChildArr[$j]][$fieldChildArr[$j]] = $rowChild[$j];
									// $tempResultsChild[$fieldChildArr[$j]] = $rowChild[$j];
								}
								if (count($joinResult))
									$tempResultsChild[$joinTable] = $joinResult;
								array_push($resultsChild,$tempResultsChild);
							}
						}
						
						$tempResults[$aliasChild] = $resultsChild;
						
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
		// echo $this->_table . PHP_EOL;
		$this->_describe = $cache->get('describe'.$this->_table);

		if (!$this->_describe) {
			$this->_describe = array();
			$query = 'DESCRIBE '.$this->_table;
			// echo $query . PHP_EOL;
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

	public function custom($query, $params=null){
		$stmt = $this->_db->prepare($query);
		return $stmt->execute($params);

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
		// echo $query . PHP_EOL;
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
                
                foreach($this->hasMany as $aliasChild => $childTable){
                    $queryChild = '';
                    $conditionsChild = '';
                    $fromChild = '';
             
					
                    $conditionsChild .= $this->_table.'_id = '.$this->id;

                    $queryChild = 'DELETE FROM ' . $childTable . ' WHERE ' . $conditionsChild ;
					// echo $queryChild . PHP_EOL;
                    $stmt = $this->_db->prepare($queryChild);
                    $this->_result = $stmt->execute();
                    if (!$this->_result){
						echo "error delete child row!" . PHP_EOL;
                        return false;
                    }
                }
            }
            if (isset($this->hasManyAndBelongsToMany)){
                foreach ($this->hasManyAndBelongsToMany as $aliasChild=>$childTable) {
                    $queryChild = '';
                    $conditionsChild = '';
                    $fromChild = '';

                    // $tableChild = strtolower($tableChild);


                    $sortTables = array($this->_table,$childTable);
                    sort($sortTables);
                    $joinTable = implode('_',$sortTables);
                    
                    $fromChild .= '`'.$joinTable.'`';
                    $conditionsChild .= strtolower($this->_table).'_id = '.$this->id;
                    $queryChild =  'DELETE  FROM '.$fromChild.' WHERE '.$conditionsChild;	

                    $stmt = $this->_db->prepare($queryChild);
					// echo $queryChild;
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
		if (isset($this->id)) 
			$this->id = null;
		if (isset($this->childID)) 
			$this->childID = null;	
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

