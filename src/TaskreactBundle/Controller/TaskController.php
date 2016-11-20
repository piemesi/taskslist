<?php

namespace TaskreactBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class TaskController extends Controller
{
    public function indexAction()
    {
        return $this->render('TaskreactBundle:Default:show.html.twig',
                [
                    "name"=>"Задачи",
                    "condition"=>"all"
                    ]);
    }
    
    
    /**
     * #..@Route(... Можно бы и через аннтотации
     */
    public function listAction($_condition)
    {
        #print($_condition);
        
        $tasks = [
            ['id' => 1, 'username' => '1AquaPelham', 'avatarUri' => '/images/leanna.jpeg', 'note' => 'Octopus asked me a riddle, outsmarted me', 'date' => 'Dec. 10, 2015'],
            ['id' => 2, 'username' => '2AquaWeaver', 'avatarUri' => '/images/ryan.jpeg', 'note' => 'I counted 8 legs... as they wrapped around me', 'date' => 'Dec. 1, 2015'],
            ['id' => 3, 'username' => '3AquaPelham', 'avatarUri' => '/images/leanna.jpeg', 'note' => 'Inked!', 'date' => 'Aug. 20, 2015'],
        ];
        $data = [
            'tasks' => $tasks
        ];
        
        #return $this->render('TaskreactBundle:Default:index.html.twig');
        return new JsonResponse($data);
    }
}
