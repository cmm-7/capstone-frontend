import { Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Comments from "./Comments";

export default function EventSlideover({
  currentUser,
  API,
  slideoverOpen,
  setSlideoverOpen,
  currentEvent,
  currentUsersRSVPS,
  setCurrentUsersRSVPS,
  confirmationModalOpen,
  setConfirmationModalOpen,
  setChatVisible,
  setChatTargetID,
  setProfileOpen,
  editEventSlideOverOpen,
  setEditEventSlideOverOpen,
  rsvpSuccess,
}) {
  const currentUserId = currentUser.id;

  const handleOnClickEditSliderOver = () => {
    setEditEventSlideOverOpen(true);
  };

  return (
    <Transition.Root show={slideoverOpen} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={setSlideoverOpen}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
                    <div className="bg-orange-500 px-4 py-7 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="py-1 text-base font-semibold leading-6 text-white"
                        >
                          Event
                        </h2>
                        <div className="bg-orange-500 child:bg-orange-500 ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:outline hover:outline-white focus:ring-2 focus:ring-white"
                            onClick={() => setSlideoverOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon
                              className="text-white h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="relative h-40 sm:h-56">
                            <img
                              className="absolute h-full w-full object-cover rounded-b-xl"
                              src={
                                (currentEvent.event_photos || [])[0] ||
                                "https://as2.ftcdn.net/v2/jpg/01/20/28/25/1000_F_120282530_gMCruc8XX2mwf5YtODLV2O1TGHzu4CAb.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {currentEvent.event_name}
                                  </h3>
                                  <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                    <span className="sr-only">Online</span>
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {currentEvent.event_address}
                                </p>
                              </div>
                              <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                <button
                                  type="button"
                                  className={
                                    currentUsersRSVPS.some(
                                      (entry) =>
                                        entry.event_id === currentEvent.id
                                    )
                                      ? "inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                      : "inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-white outline outline-orange-500 px-3 py-2 text-sm font-semibold text-orange-500 shadow-sm hover:bg-orange-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                  }
                                  onClick={() => {
                                    currentUsersRSVPS.some(
                                      (entry) =>
                                        entry.event_id === currentEvent.id
                                    )
                                      ? setConfirmationModalOpen(true)
                                      : axios
                                          .post(`${API}/usersevents/`, {
                                            user_id: currentUserId,
                                            event_id: currentEvent.id,
                                            rsvp: true,
                                          })
                                          .then((res) => {
                                            axios
                                              .get(
                                                `${API}/usersevents/${currentUserId}`
                                              )
                                              .then((res) => {
                                                setCurrentUsersRSVPS(res.data);
                                                rsvpSuccess();
                                              });
                                          });
                                  }}
                                >
                                  {currentUsersRSVPS.some(
                                    (entry) =>
                                      entry.event_id === currentEvent.id
                                  )
                                    ? `RSVP'D`
                                    : `RSVP`}
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  Pin
                                </button>
                                <div className="ml-3 inline-flex sm:ml-0">
                                  <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                  >
                                    <Menu.Button className="inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                      <span className="sr-only">
                                        Open options menu
                                      </span>
                                      <EllipsisVerticalIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </Menu.Button>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="group absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white hover:bg-orange-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <div
                                                className={
                                                  "text-gray-700 group-hover:text-white block px-4 py-2 text-sm cursor-pointer"
                                                }
                                                onClick={
                                                  handleOnClickEditSliderOver
                                                }
                                              >
                                                Edit Event
                                              </div>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p>{currentEvent.event_description}</p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Location
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {currentEvent.event_address}
                            </dd>
                          </div>
                          {/* <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Website
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              ashleyporter.com
                            </dd>
                          </div> */}
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <time dateTime={currentEvent.event_date}>
                                {currentEvent.event_date}
                              </time>
                            </dd>
                          </div>
                          <div>
                            <h1 className="mb-1 text-lg font-bold text-gray-900">
                              Comments
                            </h1>
                            <Comments
                              editEventSlideOverOpen={editEventSlideOverOpen}
                              currentUser={currentUser}
                              currentEvent={currentEvent}
                              currentUserId={currentUserId}
                              API={API}
                              setChatVisible={setChatVisible}
                              setChatTargetID={setChatTargetID}
                              setProfileOpen={setProfileOpen}
                            />
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
