
import { Request, Response } from "express";

const todos = [
  { id: 1, text: 'By milk', createdAt: new Date() },
  { id: 2, text: 'By bread', createdAt: null },
  { id: 3, text: 'By butter', createdAt: new Date() },
];

export class TodosController {

  // * Inyeccion de dependencias
  constructor(){
  }

  public getTodos = (req:Request, res:Response) => {

    return res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'Argumento ID no es un numero' });
    const todo = todos.find(todo => todo.id === id);
    
    (todo) ? res.json(todo) : res.status(404).json(`TODO con el id ${id} no encontrado.`);
  }

  public crearTodo = (req:Request, res:Response) => {
    const { text } = req.body;
    if(!text) return res.status(400).json({ error: 'Text property is required' });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: null
    };

    todos.push(newTodo);

    res.json(newTodo);
  }

  public updateTodo = (req:Request, res:Response) => {
    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).json({ error: 'Argumento ID no es un numero' });

    const todo = todos.find(todo => todo.id === id);

    if(!todo) return res.status(404).json({ error: `Todo whit id ${id} not found` });

    const { text, createdAt } = req.body;

    todo.text = text || todo.text;
    (createdAt === 'null') 
      ? todo.createdAt = null 
      : todo.createdAt = new Date(createdAt || todo.createdAt);

    res.json(todo);
    
  }

  public deleteTodo = (req:Request, res:Response) => {
   const id = +req.params.id;
   if (isNaN(id)) return res.status(400).json({ error: 'Argumento ID no es un numero' });

   const todo = todos.find(todo => todo.id === id);
   if(!todo) return res.status(404).json({ error: `Todo whit id ${id} not found` });

   todos.splice(todos.indexOf(todo), 1);
   res.json(todo);
  }
}