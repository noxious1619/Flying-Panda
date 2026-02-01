let alerts = [];

export const getAlerts = (req, res) => {
  const { country, status } = req.query;
  let result = [...alerts];

  if (country) result = result.filter(a => a.country === country);
  if (status) result = result.filter(a => a.status === status);

  res.json(result);
};

export const createAlert = (req, res) => {
  const { country, city, visaType } = req.body;
  if (!country || !city || !visaType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newAlert = { id: Date.now(), country, city, visaType, status: "Active", createdAt: new Date() };
  alerts.push(newAlert);
  res.status(201).json(newAlert);
};

export const updateAlert = (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const alert = alerts.find(a => a.id === id);

  if (!alert) return res.status(404).json({ error: "Alert not found" });
  if (!status) return res.status(400).json({ error: "Status is required" });

  alert.status = status;
  res.json(alert);
};

export const deleteAlert = (req, res) => {
  const id = Number(req.params.id);
  const index = alerts.findIndex(a => a.id === id);

  if (index === -1) return res.status(404).json({ error: "Alert not found" });

  alerts.splice(index, 1);
  res.status(204).send();
};