<?php

namespace TaskreactBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    
    
    /**
     * Приводим минуты и время в формате HH:ii в TS
     * 
     * @param string $time
     * @param type $minutes
     * @return int
     */
    static public function makeTSofTime($time, $minutes=null)
    {
        if($minutes)
        {
            $secsTime=$time*60; 
        }else{
            $timeArr=  explode(":", $time);
            $secsTime=$timeArr[0]*3600+$timeArr[1]*60;
        }

        return $secsTime;
    }
    
    /**
     * Получаем пересечение двух периодов
     * 
     * @param string $period1 - формата "HH:ii-HH:ii" - первый период для проверки пересечения
     * @param type $period2 - формата "HH:ii-HH:ii" - второй период для проверки пересечения
     * @return string - период пересечения или notUnion -обозначающий, что не пересекаются
     */
    private function calculate($period1,$period2)
    {
        date_default_timezone_set('UTC');
        $perTemp1=explode("-",$period1);
        $period1Start=self::makeTSofTime($perTemp1[0]);
        $period1Finish=self::makeTSofTime($perTemp1[1]);
        
        $perTemp2=explode("-",$period2);
        $period2Start=self::makeTSofTime($perTemp2[0]);
        $period2Finish=self::makeTSofTime($perTemp2[1]);
        
        $arrRel[$period1Start]="a1";
        $arrRel[$period1Finish]="a2";
        $arrRel[$period2Start]="b1";
        $arrRel[$period2Finish]="a2";
        
        $mergeArray=[$period1Start,$period1Finish,$period2Start,$period2Finish];
        
        sort($mergeArray);
//        print_r($mergeArray);
//        print_r($arrRel);
        if(strpos($arrRel[$mergeArray[1]],"1") && strpos($arrRel[$mergeArray[2]],"2")
                || $mergeArray[1]==$mergeArray[2] )
        {
            return date("H:i",$mergeArray[1])."-".date("H:i",$mergeArray[2]);
        }else{
            return "notUnion";
        }
        
    }
    
     public function testPeriod()
    {
       
        $result=$this->calculate("10:00-14:00","11:00-13:00");
        $this->assertEquals("11:00-13:00", $result);
        
        $result=$this->calculate("10:00-14:00","09:00-13:00");
        $this->assertEquals("10:00-13:00", $result);
        
        $result=$this->calculate("10:00-14:00","11:00-15:00");
        $this->assertEquals("11:00-14:00", $result);
        
        $result=$this->calculate("10:00-14:00","14:00-15:00");
        $this->assertEquals("14:00-14:00", $result);
        
        $result=$this->calculate("10:00-14:00","14:30-15:00");
        $this->assertEquals("notUnion", $result);
    }
    
}
