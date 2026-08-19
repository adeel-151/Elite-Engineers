const { z } = require('zod');

exports.projectSchema = z.object({
  title: z.string().min(1).max(200),
  category: z.enum([
    'Architectural & Structural Design',
    'Construction',
    'Project Management & Supervision',
    'Renovation & Interior Fit-Out',
    'Quantity Surveying/Estimation/BOQs',
    'Engineering Consultancy'
  ]),
  description: z.string().min(1).max(5000),
  location: z.string().min(1).max(500),
  client: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional(),
  completedDate: z.string().or(z.date()).optional(),
  featured: z.boolean().optional().or(z.string().transform(v => v === 'true')),
}).strict(); // strict() prevents mass assignment of undefined fields

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
}).strict();
