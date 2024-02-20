import { Board } from "./type";

const board1: Board = 
{'id': '22668b07-5682-4417-9241-d9bc6c983931', 'name': 'Platform Launch', 'statusList': [
    {'id': '26e909fe-4b60-46a4-af3d-7206ca15ca80', 'value': 'todo'
    },
    {'id': '935c11db-eeb2-4f36-ae92-fbb6d228a737', 'value': 'doing'
    },
    {'id': '182e219e-9138-4eca-87b4-7246abe7fee4', 'value': 'done'
    }
], 'tasks': [
    {'title': 'Build UI for onboarding flow', 'description': '',  'subtasks': [
            {'title': 'Sign up page', 'isCompleted': true, 'id': 'c1c4b2d5-2603-4b59-9fd9-e62665cad84a'
            },
            {'title': 'Sign in page', 'isCompleted': false, 'id': 'd9276e4c-fa48-4e32-8bfa-4442ea2fcc3b'
            },
            {'title': 'Welcome page', 'isCompleted': false, 'id': 'f9e428a7-5f03-4ad8-9ce2-d7703f167faf'
            }
        ], 'statusId': '26e909fe-4b60-46a4-af3d-7206ca15ca80', 'id': 'b5711d91-98ea-44fd-a0fa-f711a94cfb98'
    },
    {'title': 'Build UI for search', 'description': '',  'subtasks': [
            {'title': 'Search page', 'isCompleted': false, 'id': '0b357ade-0818-417f-830d-532ee4444071'
            }
        ], 'statusId': '26e909fe-4b60-46a4-af3d-7206ca15ca80', 'id': 'cb3bb8f4-c46d-42ee-a784-ebea94ca4168'
    },
    {'title': 'Build settings UI', 'description': '',  'subtasks': [
            {'title': 'Account page', 'isCompleted': false, 'id': '5d8cbf5e-bfcf-4d41-8488-f0f726b09e7b'
            },
            {'title': 'Billing page', 'isCompleted': false, 'id': 'aed98d90-8ed9-461a-a599-a100d7d88de8'
            }
        ], 'statusId': '26e909fe-4b60-46a4-af3d-7206ca15ca80', 'id': '8835b6cb-d71f-46fd-827f-578e87e42ff2'
    },
    {'title': 'QA and test all major user journeys', 'description': 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',  'subtasks': [
            {'title': 'Internal testing', 'isCompleted': false, 'id': 'cdbccd56-19f4-4f86-b9a1-360a3e16d9df'
            },
            {'title': 'External testing', 'isCompleted': false, 'id': '099d902a-24d2-4260-9180-3e41a612ac57'
            }
        ], 'statusId': '26e909fe-4b60-46a4-af3d-7206ca15ca80', 'id': 'caa6c45a-8037-42b5-b80b-79f238994b9a'
    },
    {'title': 'Design settings and search pages', 'description': '',  'subtasks': [
            {'title': 'Settings - Account page', 'isCompleted': true, 'id': '061a1e71-6566-42ac-b68c-386c208a7ff7'
            },
            {'title': 'Settings - Billing page', 'isCompleted': true, 'id': 'a2a2b6d5-46af-490d-a33c-2738377e4543'
            },
            {'title': 'Search page', 'isCompleted': false, 'id': '43a43597-390b-47b1-bac7-cf086606e429'
            }
        ], 'statusId': '935c11db-eeb2-4f36-ae92-fbb6d228a737', 'id': 'd5f25c79-abaf-49eb-af96-8a5881cbd539'
    },
    {'title': 'Add account management endpoints', 'description': '',  'subtasks': [
            {'title': 'Upgrade plan', 'isCompleted': true, 'id': '9c2f64ad-13d8-4ca2-bed8-e023881fcacd'
            },
            {'title': 'Cancel plan', 'isCompleted': true, 'id': 'd5fd2c8e-5d17-4e58-bf87-de32717d609d'
            },
            {'title': 'Update payment method', 'isCompleted': false, 'id': '0b583ab6-bb34-4fc9-8582-e31f8eb52bb8'
            }
        ], 'statusId': '935c11db-eeb2-4f36-ae92-fbb6d228a737', 'id': 'f9eec76b-33da-4366-92ac-181a7fb098fe'
    },
    {'title': 'Design onboarding flow', 'description': '',  'subtasks': [
            {'title': 'Sign up page', 'isCompleted': true, 'id': '526fcd39-4376-425c-a041-611f14eb122b'
            },
            {'title': 'Sign in page', 'isCompleted': false, 'id': '6337fdd1-fe1c-4388-9515-70e7622c51fc'
            },
            {'title': 'Welcome page', 'isCompleted': false, 'id': '76ab5ac5-5e4b-4a6b-bd00-8474e0f8dbdd'
            }
        ], 'statusId': '935c11db-eeb2-4f36-ae92-fbb6d228a737', 'id': '2661d252-8a25-443a-9276-72e1be35fbe7'
    },
    {'title': 'Add search enpoints', 'description': '',  'subtasks': [
            {'title': 'Add search endpoint', 'isCompleted': true, 'id': '1e95a156-0978-497f-8406-22e80fe042f2'
            },
            {'title': 'Define search filters', 'isCompleted': false, 'id': '4a3960ee-f779-4bf7-94fc-12cbfeaf637d'
            }
        ], 'statusId': '935c11db-eeb2-4f36-ae92-fbb6d228a737', 'id': '5b8191ca-00a3-4f48-9e5c-904cd3387f27'
    },
    {'title': 'Add authentication endpoints', 'description': '',  'subtasks': [
            {'title': 'Define user model', 'isCompleted': true, 'id': 'e0d88d44-9a96-4fde-a0b1-6291d9b8da0b'
            },
            {'title': 'Add auth endpoints', 'isCompleted': false, 'id': '6f4f93f1-8896-4396-a5d5-135d6ae3c75e'
            }
        ], 'statusId': '935c11db-eeb2-4f36-ae92-fbb6d228a737', 'id': 'd92bb347-d7a4-4a07-b20d-5dcec7d29b40'
    },
    {'title': 'Research pricing points of various competitors and trial different business models', 'description': "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",  'subtasks': [
            {'title': 'Research competitor pricing and business models', 'isCompleted': true, 'id': '3b470aea-bcc1-4bd1-a45f-f65d472971f0'
            },
            {'title': 'Outline a business model that works for our solution', 'isCompleted': false, 'id': '7c1477c9-873f-4ed1-814e-0635eb3afe46'
            },
            {'title': 'Talk to potential customers about our proposed solution and ask for fair price expectancy', 'isCompleted': false, 'id': '2f0c3f5c-c73b-4d61-80cd-4269c03c789e'
            }
        ], 'statusId': '935c11db-eeb2-4f36-ae92-fbb6d228a737', 'id': 'dd1bcb74-0f4c-45ac-99b2-600c16bf0300'
    },
    {'title': 'Conduct 5 wireframe tests', 'description': 'Ensure the layout continues to make sense and we have strong buy-in from potential users.',  'subtasks': [
            {'title': 'Complete 5 wireframe prototype tests', 'isCompleted': true, 'id': '4547d671-d272-402c-9f41-f92cea3d41df'
            }
        ], 'statusId': '182e219e-9138-4eca-87b4-7246abe7fee4', 'id': '8be1a017-6dd1-4c8b-a3b7-480f08331a00'
    },
    {'title': 'Create wireframe prototype', 'description': 'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',  'subtasks': [
            {'title': 'Create clickable wireframe prototype in Balsamiq', 'isCompleted': true, 'id': '09fb1307-98ad-4e9b-ad64-43781f22ac75'
            }
        ], 'statusId': '182e219e-9138-4eca-87b4-7246abe7fee4', 'id': '61e8b13f-3118-43c9-9beb-2e58ebdf290d'
    },
    {'title': 'Review results of usability tests and iterate', 'description': "Keep iterating through the subtasks until we're clear on the core concepts for the app.",  'subtasks': [
            {'title': 'Meet to review notes from previous tests and plan changes', 'isCompleted': true, 'id': '017261dc-1d5a-4e33-81a5-fd4f19c380e2'
            },
            {'title': 'Make changes to paper prototypes', 'isCompleted': true, 'id': '89ce1c33-d05a-42df-a71f-77474b9762e9'
            },
            {'title': 'Conduct 5 usability tests', 'isCompleted': true, 'id': '7c2cae5e-7416-49be-8a35-b8a9a2ae5958'
            }
        ], 'statusId': '182e219e-9138-4eca-87b4-7246abe7fee4', 'id': '995f137f-ff58-4049-b5db-e0f7d3acae3b'
    },
    {'title': 'Create paper prototypes and conduct 10 usability tests with potential customers', 'description': '',  'subtasks': [
            {'title': 'Create paper prototypes for version one', 'isCompleted': true, 'id': '44ca3e95-ab2f-4349-8b9f-aa3f610a1c66'
            },
            {'title': 'Complete 10 usability tests', 'isCompleted': true, 'id': '4299a1ee-0736-4d0b-8476-f92d6f0fd1fb'
            }
        ], 'statusId': '182e219e-9138-4eca-87b4-7246abe7fee4', 'id': '78c31da3-b821-442f-b37b-4ddc7b52c93c'
    },
    {'title': 'Market discovery', 'description': 'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',  'subtasks': [
            {'title': 'Interview 10 prospective customers', 'isCompleted': true, 'id': 'a06894db-b4aa-428e-93a5-db6d3f638249'
            }
        ], 'statusId': '182e219e-9138-4eca-87b4-7246abe7fee4', 'id': '9f04ea4d-325d-4745-8787-20cdc7ccbfbb'
    },
    {'title': 'Competitor analysis', 'description': '',  'subtasks': [
            {'title': 'Find direct and indirect competitors', 'isCompleted': true, 'id': 'a1333f66-6d4c-45df-a6bb-b7b6c27968a1'
            },
            {'title': 'SWOT analysis for each competitor', 'isCompleted': true, 'id': '5bb39cc2-29a9-4425-a890-ba3f71d8c5d5'
            }
        ], 'statusId': '182e219e-9138-4eca-87b4-7246abe7fee4', 'id': 'acba2056-e274-4abc-ba20-df58550f59a6'
    },
    {'title': 'Research the market', 'description': 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',  'subtasks': [
            {'title': 'Write up research analysis', 'isCompleted': true, 'id': '00cc4a3b-ff82-4596-b841-a8900496db73'
            },
            {'title': 'Calculate TAM', 'isCompleted': true, 'id': '2c147504-74a3-4fd0-b7a2-beafa78e0870'
            }
        ], 'statusId': '182e219e-9138-4eca-87b4-7246abe7fee4', 'id': '1f45673f-1702-4b99-93c8-b885b8b6b88c'
    }
]
}

const board2: Board = 
{'id': 'd81ccaf2-9482-4058-8525-82139523464d', 'name': 'Marketing Plan', 'statusList': [
    {'id': 'dbef7362-3c62-44c4-a37b-6dafea8dc6ae', 'value': 'todo'
    },
    {'id': '289f3584-dc45-4539-94ee-05d04f2daa58', 'value': 'doing'
    },
    {'id': 'cd3f63c7-41ad-4322-8176-b71412e760b9', 'value': 'done'
    }
], 'tasks': [
    {'title': 'Plan Product Hunt launch', 'description': '',  'subtasks': [
            {'title': 'Find hunter', 'isCompleted': false, 'id': '75e8cf18-54f9-492f-8627-bf7d362d34dc'
            },
            {'title': 'Gather assets', 'isCompleted': false, 'id': '40f256f4-1add-4590-9e54-d3507acbbb41'
            },
            {'title': 'Draft product page', 'isCompleted': false, 'id': '63941559-b7ac-45f6-9078-7924570322db'
            },
            {'title': 'Notify customers', 'isCompleted': false, 'id': '1804c2c1-b83b-488a-bf3e-aef22b84309e'
            },
            {'title': 'Notify network', 'isCompleted': false, 'id': '1dde188d-0603-4903-8e20-312f21f9fd43'
            },
            {'title': 'Launch!', 'isCompleted': false, 'id': '7ef6cfc7-0124-4770-96a7-45d737498190'
            }
        ], 'statusId': 'dbef7362-3c62-44c4-a37b-6dafea8dc6ae', 'id': '61c9cbd3-ff64-4838-b0ff-a83662e29839'
    },
    {'title': 'Share on Show HN', 'description': '',  'subtasks': [
            {'title': 'Draft out HN post', 'isCompleted': false, 'id': '20f0ccfc-401a-4763-9b92-5844797315cd'
            },
            {'title': 'Get feedback and refine', 'isCompleted': false, 'id': '01a1b452-0f13-4b65-9487-5248ee926a8b'
            },
            {'title': 'Publish post', 'isCompleted': false, 'id': '75e3d0ec-256b-48d3-a756-72e45954ee03'
            }
        ], 'statusId': 'dbef7362-3c62-44c4-a37b-6dafea8dc6ae', 'id': '833c1a28-e685-4eab-ba79-9e658579454f'
    },
    {'title': 'Write launch article to publish on multiple channels', 'description': '',  'subtasks': [
            {'title': 'Write article', 'isCompleted': false, 'id': 'b8f570d3-e3e5-4fbf-be33-b7765ca09403'
            },
            {'title': 'Publish on LinkedIn', 'isCompleted': false, 'id': 'd115202f-bd6a-498a-9b2b-9492cf80b2b7'
            },
            {'title': 'Publish on Inndie Hackers', 'isCompleted': false, 'id': '8fe24f5f-73c7-4317-971f-00983a7c60c5'
            },
            {'title': 'Publish on Medium', 'isCompleted': false, 'id': 'dbccc033-22fa-432b-9dab-f5a2e268f779'
            }
        ], 'statusId': 'dbef7362-3c62-44c4-a37b-6dafea8dc6ae', 'id': '09aa129c-9ce5-4d0a-a490-e3e66da003ef'
    }
]
}

const board3: Board = 
{'id': 'aa174579-3df0-4cd2-bff5-c98890cc7c38', 'name': 'Roadmap', 'statusList': [
    {'id': '3ecf729b-a2f2-43b5-8f05-3445de471320', 'value': 'now'
    },
    {'id': '46898280-68a7-43a6-b288-a3b8ea4573b1', 'value': 'next'
    },
    {'id': '6bbae111-b0e8-4b0c-8990-763849d70352', 'value': 'later'
    }
], 'tasks': [
    {'title': 'Launch version one', 'description': '',  'subtasks': [
            {'title': 'Launch privately to our waitlist', 'isCompleted': false, 'id': '67f81d3c-ccbd-4faa-a223-afbaa482ed81'
            },
            {'title': 'Launch publicly on PH, HN, etc.', 'isCompleted': false, 'id': 'c7918fb4-6e2e-4a03-96e3-c607ef88c238'
            }
        ], 'statusId': '3ecf729b-a2f2-43b5-8f05-3445de471320', 'id': '2fe151ed-0763-400d-8deb-0db0eee8fda2'
    },
    {'title': 'Review early feedback and plan next steps for roadmap', 'description': "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",  'subtasks': [
            {'title': 'Interview 10 customers', 'isCompleted': false, 'id': 'c65ff5cc-4a3d-45aa-abae-795fe85a4d33'
            },
            {'title': 'Review common customer pain points and suggestions', 'isCompleted': false, 'id': '05b69875-79bf-4d74-8a46-de8946c35c00'
            },
            {'title': 'Outline next steps for our roadmap', 'isCompleted': false, 'id': 'd048f730-0056-47dd-bb6b-72fa511012c9'
            }
        ], 'statusId': '3ecf729b-a2f2-43b5-8f05-3445de471320', 'id': '6405a894-76e6-4aed-ae90-9524a10e88ae'
    }
]
}

export const BoardsData: Board[] = [board1, board2, board3]