<?php

namespace TaskreactBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use TaskreactBundle\Entity\Task;

class TaskController extends Controller
{

    /**
     * Индексный рендер контроллера - список задач с подключенным к шаблону ReactJS
     * 
     * @return type
     */
    public function indexAction()
    {
        return $this->render('TaskreactBundle:Default:index.html.twig', [
                    "name" => "Задачи",
                    "condition" => "all"
        ]);
    }

    /**
     * Получаем список задач
     * 
     * @param type $_condition
     * @return JsonResponse
     */
    public function listAction($condition)
    {

        $em = $this->getDoctrine()
                ->getManager();
        $repository = $em->getRepository('TaskreactBundle:Task');

        //Получаем список задач заданного состояния (активные/архивные/все)
        if ($condition == "all" || $condition == "") {
            $tasks = $repository->findBy([],["id"=>"DESC"]);
        } else {
            $tasks = $repository->findBy(["currentcondition" => $condition]);
        }

        $tasksOutput = [];

        foreach ($tasks as $task) {

            $tasksOutput[] = ["id" => $task->getId(), "title" => $task->getTitle(), "condition" => $task->getCurrentcondition()];
        }

        $data = [
            'tasks' => $tasksOutput,
            'totalCount' => count($tasksOutput)
        ];

        #return $this->render('TaskreactBundle:Default:index.html.twig');
        return new JsonResponse($data);
    }

    /**
     * Создание задачи
     * 
     * @param [] $data - массив данных создаваемой задачи в toDo list
     * @return \TaskreactBundle\Controller\Response
     */
    public function createAction($data)
    {
        $data = $_REQUEST;

        $task = new Task();
        $task->setTitle($data['title']);
        $task->setCurrentcondition("active");

        $em = $this->getDoctrine()->getManager();

        $em->persist($task);

        $em->flush();

        return new Response($task->getId());
    }
    
    /**
     * Обновляем информацию по задаче
     * 
     * @param [] $data
     * @return \TaskreactBundle\Controller\Response
     * @throws type
     */
    public function updateAction($data)
    {

        $data = $_REQUEST;
        $taskId=$data['id'];

        $em = $this->getDoctrine()->getManager();
        $task = $em->getRepository('TaskreactBundle:Task')->findOneById($taskId);
        
        if (!$task) {
            throw $this->createNotFoundException(
                'No task found for id '.$taskId
            );
        }
        
        $task->setTitle($data['title']);
        $task->setCurrentcondition($data['condition']);

        $em->flush();

        return new Response($task->getId());
    }

    /**
     * Удаление задачи (добавление в архив)
     * 
     * @param [] $data
     * @return \TaskreactBundle\Controller\Response
     * @throws type
     */
    public function deleteAction($data)
    {
        $data = $_REQUEST;
        $taskId=$data['id'];

        $em = $this->getDoctrine()->getManager();
      
        $task = $em->getRepository('TaskreactBundle:Task')->findOneById($taskId);
        
        if (!$task) {
            throw $this->createNotFoundException(
                'No task found for id '.$taskId
            );
        }

        $em->remove($task);
        $em->flush();

        return new Response([]);
    }
    
}