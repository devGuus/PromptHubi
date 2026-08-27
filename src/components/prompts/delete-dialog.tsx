"use client";

import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { deletePrompt, type DeleteState } from "@/actions/prompt-actions";

const INITIAL_STATE: DeleteState = {};

export function DeleteDialog({ id, promptTitle }: { id: string; promptTitle: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(deletePrompt.bind(null, id), INITIAL_STATE);

  return (
    <>
      <Button type="button" variant="danger" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4" />
        Excluir
      </Button>

      <Dialog open={open} onOpenChange={setOpen} title="Excluir prompt">
        <p className="text-sm text-muted-foreground">
          Tem certeza que deseja excluir{" "}
          <span className="font-medium text-foreground">&ldquo;{promptTitle}&rdquo;</span>? Essa
          ação não pode ser desfeita.
        </p>

        {state.message ? <p className="mt-3 text-sm text-danger">{state.message}</p> : null}

        <div className="mt-5 flex justify-end gap-2">
          <form method="dialog">
            <Button type="submit" variant="secondary">
              Cancelar
            </Button>
          </form>
          <form action={formAction}>
            <SubmitButton variant="danger" pendingLabel="Excluindo...">
              Excluir
            </SubmitButton>
          </form>
        </div>
      </Dialog>
    </>
  );
}
