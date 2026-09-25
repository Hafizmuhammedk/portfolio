export const projects = [
  {
    id: 1,
    number: '01',
    title: 'VOICE AI AGENT',
    description:
      'Full-duplex hotel voice assistant for natural browser and phone conversations, live transcripts, configurable behavior, and interruption-aware streaming speech.',
    technologies: ['Python', 'LiveKit', 'Twilio', 'FastAPI'],
    category: 'AI / VOICE',
    image: '/images/voice-ai-agent-generated.webp',
    link: 'https://github.com/Hafizmuhammedk/voice_agent',
  },
  {
    id: 2,
    number: '02',
    title: 'LICENSE PLATE RECOGNITION',
    description:
      'Computer vision pipeline for detecting vehicle license plates in images and video, with trained weights, dataset tooling, notebooks, and reusable inference scripts.',
    technologies: ['Python', 'YOLO', 'OpenCV', 'Computer Vision'],
    category: 'COMPUTER VISION',
    image: '/images/license-plate-generated.webp',
    link: 'https://github.com/Hafizmuhammedk/License-Plate-Recognition',
  },
  {
    id: 3,
    number: '03',
    title: 'MULTI-AGENT WORKFLOWS',
    description:
      'Support platform that routes questions to specialized agents for course guidance, verified fee information, and conversation-scoped document assistance.',
    technologies: ['React', 'FastAPI', 'Airtable', 'Pinecone'],
    category: 'AGENTIC AI',
    image: '/images/multi-agent-generated.webp',
    link: 'https://github.com/Hafizmuhammedk/multi-agent-orchestration-and-workflows',
  },
];

export const experience = [];

export const technologyCards = [
  {
    name: 'LANGUAGES',
    icon: 'code',
    description: 'Languages used across production AI services, automation, data workflows, and embedded systems.',
    items: ['Python', 'JavaScript','R'],
    capabilities: [
      'Production AI APIs and workflow automation',
    ],
  },
  {
    name: 'FRAMEWORKS',
    icon: 'nodes',
    description: 'Frameworks and AI platforms for APIs, deep learning, computer vision, agents, and RAG.',
    items: ['FastAPI', 'Flask', 'PyTorch', 'TensorFlow', 'scikit-learn', 'Ultralytics', 'MediaPipe', 'OpenCV', 'Agno', 'Groq', 'Gemini Embeddings'],
    capabilities: [
      'Multi-agent assistants and PDF-grounded RAG',
      'Video detection, tracking, and CUDA inference',
    ],
  },
  {
    name: 'DATA TOOLS',
    icon: 'brain',
    description: 'Experimentation, visualization, model tracking, and retrieval tooling.',
    items: ['MLflow', 'Jupyter', 'Matplotlib', 'Seaborn', 'Roboflow', 'Postman', 'Git', 'GitHub', 'NumPy'],
    capabilities: [
      'Feature engineering and model evaluation',
      'Experiment tracking and data visualization',
    ],
  },
  {
    name: 'DATABASES',
    icon: 'database',
    description: 'Persistent, vector, and low-latency data systems for production applications.',
    items: ['PostgreSQL', 'Redis', 'Valkey', 'Firebase', 'Pinecone', 'Airtable'],
    capabilities: [
      'Vector retrieval and embedding search',
      'Low-latency caching and session state',
    ],
  },
  {
    name: 'DEVOPS & CLOUD',
    icon: 'cloud',
    description: 'Infrastructure and delivery tooling for reliable cloud and MLOps deployments.',
    items: ['Docker', 'Nginx', 'GitHub Actions', 'AWS', 'GCP', 'Vertex AI', 'PlatformIO', 'Arduino IDE', 'Thonny', 'pymaker'],
    capabilities: [
      'ECR, EC2, ECS, S3, and CloudWatch',
      'Compute Engine, CI/CD, and edge IoT delivery',
    ],
  },
];
