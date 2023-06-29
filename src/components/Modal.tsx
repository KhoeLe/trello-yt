"use client";
import { useBoardStore } from "@/store/useBoardStore";
import { useModalStore } from "@/store/useModalStore";
import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

function Modal() {
    const [closeModal, isOpen] = useModalStore((state) => [
        state.closeModal,
        state.isOpen,
    ]);

    const [setNewTodoInput,newTodoInput] = useBoardStore((state) => [
        state.setNewTodoInput,
        state.newTodoInput
    ])

    console.log(newTodoInput)



    return (
        // Use the `Transition` component at the root level
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="form" className="relative z-auto" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            {/* <div className="fixed inset-0 bg-black bg-opacity-25" /> */}
                            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">Add a Task</Dialog.Title>

                                {/* ... */}
                                    <div className="mt-2">
                                        <input
                                        className="w-full border border-gray-300 rounded-md outline-none px-3 py-2"
                                        type="text"
                                        placeholder="Enter a task here..."
                                        onChange={(e) =>  setNewTodoInput(e.target.value)}
                                        value={newTodoInput}
                                         />

                                        {/* radio group */}

                                    </div>

                                    <TaskTypeRadioGroup />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;
