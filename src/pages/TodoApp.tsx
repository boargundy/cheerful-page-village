
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash, Edit, Save, X } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { toast } = useToast();

  const addTodo = () => {
    if (newTodo.trim() === "") {
      toast({
        title: "Error",
        description: "Todo cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
    
    toast({
      title: "Todo added",
      description: "Your new todo has been added successfully",
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    
    toast({
      title: "Todo deleted",
      description: "Your todo has been deleted",
    });
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveTodo = (id: string) => {
    if (editText.trim() === "") {
      toast({
        title: "Error",
        description: "Todo cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    
    toast({
      title: "Todo updated",
      description: "Your todo has been updated successfully",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo App</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
              className="flex-1"
            />
            <Button onClick={addTodo}>
              <Plus className="mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Todos</CardTitle>
        </CardHeader>
        <CardContent>
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No todos yet. Add one above!
            </p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id}>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                    {editingId === todo.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1"
                          autoFocus
                        />
                        <Button size="sm" onClick={() => saveTodo(todo.id)}>
                          <Save className="mr-1 h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 flex-1">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo.id)}
                            id={`todo-${todo.id}`}
                          />
                          <label
                            htmlFor={`todo-${todo.id}`}
                            className={`flex-1 ${
                              todo.completed ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {todo.text}
                          </label>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditing(todo)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  {todo !== todos[todos.length - 1] && <Separator className="my-2" />}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;
