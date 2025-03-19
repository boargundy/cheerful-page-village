
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash, Edit, Save, X, Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  favorite?: boolean; // Make favorite optional since it might not be in the types
}

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch todos from Supabase
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('favorite', { ascending: false }) // First show favorites
        .order('created_at', { ascending: false }); // Then by creation date
      
      if (error) {
        toast({
          title: "Error fetching todos",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return data as Todo[];
    }
  });

  // Add a new todo
  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text, completed: false, favorite: false }])
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodo("");
      toast({
        title: "Todo added",
        description: "Your new todo has been added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding todo",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Toggle todo completion status
  const toggleTodoMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await supabase
        .from('todos')
        .update({ completed, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating todo",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Toggle favorite status
  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ id, favorite }: { id: string; favorite: boolean }) => {
      const { error } = await supabase
        .from('todos')
        .update({ favorite, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: "Favorite updated",
        description: "Todo favorite status updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating favorite",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Delete a todo
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: "Todo deleted",
        description: "Your todo has been deleted",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting todo",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update a todo
  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) => {
      const { error } = await supabase
        .from('todos')
        .update({ text, updated_at: new Date().toISOString() })
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingId(null);
      toast({
        title: "Todo updated",
        description: "Your todo has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating todo",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const addTodo = () => {
    if (newTodo.trim() === "") {
      toast({
        title: "Error",
        description: "Todo cannot be empty",
        variant: "destructive",
      });
      return;
    }

    addTodoMutation.mutate(newTodo);
  };

  const toggleTodo = (id: string, completed: boolean) => {
    toggleTodoMutation.mutate({ id, completed: !completed });
  };

  const toggleFavorite = (id: string, favorite: boolean = false) => {
    toggleFavoriteMutation.mutate({ id, favorite: !favorite });
  };

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
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

    updateTodoMutation.mutate({ id, text: editText });
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
              disabled={addTodoMutation.isPending}
            />
            <Button 
              onClick={addTodo} 
              disabled={addTodoMutation.isPending}
            >
              {addTodoMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2" />
              )}
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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : todos.length === 0 ? (
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
                          disabled={updateTodoMutation.isPending}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => saveTodo(todo.id)}
                          disabled={updateTodoMutation.isPending}
                        >
                          {updateTodoMutation.isPending ? (
                            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="mr-1 h-4 w-4" />
                          )}
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                          disabled={updateTodoMutation.isPending}
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
                            onCheckedChange={() => toggleTodo(todo.id, todo.completed)}
                            id={`todo-${todo.id}`}
                            disabled={toggleTodoMutation.isPending}
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
                            onClick={() => toggleFavorite(todo.id, todo.favorite)}
                            disabled={toggleFavoriteMutation.isPending}
                            className={todo.favorite ? "text-yellow-500" : ""}
                          >
                            <Star className="h-4 w-4" fill={todo.favorite ? "currentColor" : "none"} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditing(todo)}
                            disabled={editingId !== null}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTodo(todo.id)}
                            disabled={deleteTodoMutation.isPending}
                          >
                            {deleteTodoMutation.isPending && deleteTodoMutation.variables === todo.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
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
