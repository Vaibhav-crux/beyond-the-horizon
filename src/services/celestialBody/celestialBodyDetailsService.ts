import CelestialBodyDetails, { ICelestialBodyDetails } from '../../models/CelestialBodyDetails';
import CelestialBody from '../../models/CelestialBody';

export async function getAllCelestialBodyDetails(): Promise<ICelestialBodyDetails[]> {
  try {
    // Fetch all celestial body details and populate the associated celestial body name
    const celestialBodyDetails = await CelestialBodyDetails.find()
      .populate('celestialBody', 'name')  // Populate the celestialBody field and only include the name field
      .exec();
      
    return celestialBodyDetails;
  } catch (error) {
    console.error('Error fetching celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}


export async function createCelestialBodyDetails(
  celestialBodyId: string,
  details: string,
  avgDistance: number,
  estTravelTime: number,
  summary: string
): Promise<ICelestialBodyDetails> {
  try {
    // Check if the CelestialBody exists
    const celestialBody = await CelestialBody.findById(celestialBodyId);

    if (!celestialBody) {
      throw new Error('Celestial Body not found');
    }

    // Create a new CelestialBodyDetails instance
    const newCelestialBodyDetails = new CelestialBodyDetails({
      celestialBody: celestialBody._id,
      details,
      avgDistance,
      estTravelTime,
      summary,
    });

    // Save the details to the database
    await newCelestialBodyDetails.save();

    return newCelestialBodyDetails;
  } catch (error) {
    console.error('Error creating celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}


export async function updateCelestialBodyDetails(
  id: string,
  updates: Partial<ICelestialBodyDetails>
): Promise<ICelestialBodyDetails | null> {
  try {
    // Find the celestial body detail by ID and update it with the provided data
    const updatedCelestialBodyDetails = await CelestialBodyDetails.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCelestialBodyDetails) {
      throw new Error('Celestial Body Details not found');
    }

    return updatedCelestialBodyDetails;
  } catch (error) {
    console.error('Error updating celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}


export async function deleteCelestialBodyDetails(id: string): Promise<void> {
  try {
    const result = await CelestialBodyDetails.findByIdAndDelete(id);

    if (!result) {
      throw new Error('Celestial Body Details not found');
    }
  } catch (error) {
    console.error('Error deleting celestial body details in service:', error);
    throw new Error('Internal Server Error');
  }
}