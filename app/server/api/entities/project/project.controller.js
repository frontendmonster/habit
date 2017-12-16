import Project from './project.model';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.list();
    res.json(projects);
  } catch (e) {
    next(e);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { proj_id } = req.params;

    const project = await Project.get(proj_id);

    if (project == null) {
      res.status(404).send({ message: 'not found' });
    } else {
      res.json(project.toJSON());
    }
  } catch (e) {
    next(e);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (e) {
    next(e);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { proj_id } = req.params;

    const project = await Project.remove(proj_id);

    res.json({ message: 'deleted', id: project._id });
  } catch (e) {
    next(e);
  }
};
