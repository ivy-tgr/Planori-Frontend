'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

interface ProgramSection {
  id: string;
  time: string;
  program: string;
  responsible: string;
}

interface Material {
  id: string;
  checked: boolean;
  item: string;
  unit: string;
  assignedTo: string;
}

export default function ActivityPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id as string;
  const isNew = activityId === "new";

  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState({
    name: '',
    date: '',
    location: '',
    startTime: '',
    endTime: '',
    redThread: '',
    safetyNotes: '',
  });

  const [programSections, setProgramSections] = useState<ProgramSection[]>([
    { id: '1', time: '09:30', program: '', responsible: '' }
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', checked: false, item: '', unit: 'Stu', assignedTo: 'Stu' }
  ]);

  // Lade Aktivität vom Backend
  useEffect(() => {
      if (!isNew && activityId) {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/activities/${activityId}`);
        if (!response.ok) {
          throw new Error('Aktivität nicht gefunden');
        }
        
        const data = await response.json();
        console.log('Geladene Aktivität:', data);
        
        // Fülle Formular mit geladenen Daten
        setActivityData({
          name: data.name || '',
          date: data.date || '',
          location: data.location || '',
          startTime: data.startTime || '',
          endTime: data.endTime || '',
          redThread: data.redThread || '',
          safetyNotes: data.safetyNotes || ''
        });

        // Lade Programm-Abschnitte falls vorhanden
        if (data.programSections && data.programSections.length > 0) {
          setProgramSections(data.programSections);
        }

        // Lade Materialien falls vorhanden
        if (data.materials && data.materials.length > 0) {
          setMaterials(data.materials);
        }

      } catch (error) {
        console.error('Fehler beim Laden der Aktivität:', error);
        alert('Fehler beim Laden der Aktivität');
      } finally {
        setLoading(false);
      }
    };

    if (activityId) {
      fetchActivity();
    }
    
  
  } else {
    setLoading(false);
  }
}, [activityId, isNew]);

  const addProgramSection = () => {
    const newSection: ProgramSection = {
      id: Date.now().toString(),
      time: '',
      program: '',
      responsible: ''
    };
    setProgramSections([...programSections, newSection]);
  };

  const updateProgramSection = (id: string, field: keyof ProgramSection, value: string) => {
    setProgramSections(programSections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const removeProgramSection = (id: string) => {
    setProgramSections(programSections.filter(section => section.id !== id));
  };

  const addMaterial = () => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      checked: false,
      item: '',
      unit: 'Stu',
      assignedTo: 'Stu'
    };
    setMaterials([...materials, newMaterial]);
  };

  const updateMaterial = (
    id: string,
    field: keyof Material,
    value: string | boolean
  ) => {
    setMaterials(materials.map(material =>
      material.id === id ? { ...material, [field]: value } : material
    ));
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const handleSave = async () => {
  try {
    const activityPayload = {
      name: activityData.name,
      date: activityData.date,
      location: activityData.location,
      startTime: activityData.startTime,
      endTime: activityData.endTime,
      redThread: activityData.redThread,
      safetyNotes: activityData.safetyNotes,
      programSections,
      materials
    };

    console.log('Speichere Aktivität:', activityPayload);

    let url, method;
    if (isNew) {
      // Neue Aktivität anlegen!
      url = `http://localhost:3000/api/activities`;
      method = 'POST';
    } else {
      // Bestehende bearbeiten!
      url = `http://localhost:3000/api/activities/${activityId}`;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityPayload)
    });

    if (response.ok) {
      router.back(); // oder router.push("/activities") etc.
    } else {
      const err = await response.json();
      throw new Error(err.error || 'Fehler beim Speichern');
    }
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    if (error instanceof Error) {
      alert(error.message || 'Fehler beim Speichern der Aktivität');
    } else {
      alert('Fehler beim Speichern der Aktivität');
    }
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Aktivität bearbeiten</h1>
              <p className="text-gray-500 mt-1">{activityData.name || 'Unbenannte Aktivität'}</p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Speichern
          </Button>
        </div>

        {/* Grundinformationen */}
        <Card>
          <CardHeader>
            <CardTitle>Grundinformationen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Titel der Aktivität</Label>
              <Input 
                value={activityData.name}
                onChange={(e) => setActivityData({...activityData, name: e.target.value})}
                placeholder="z.B. Willy Wonka SSL"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ort</Label>
                <Input 
                  value={activityData.location}
                  onChange={(e) => setActivityData({...activityData, location: e.target.value})}
                  placeholder="z.B. Waldhütte Ettenberg"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Datum</Label>
                <Input 
                  type="date"
                  value={activityData.date}
                  onChange={(e) => setActivityData({...activityData, date: e.target.value})}
                />
              </div>
              <div>
                <Label>Von</Label>
                <Input 
                  type="time"
                  value={activityData.startTime}
                  onChange={(e) => setActivityData({...activityData, startTime: e.target.value})}
                />
              </div>
              <div>
                <Label>Bis</Label>
                <Input 
                  type="time"
                  value={activityData.endTime}
                  onChange={(e) => setActivityData({...activityData, endTime: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roter Faden */}
        <Card>
          <CardHeader>
            <CardTitle>Roter Faden</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Beschreibe die Story der Aktivität..."
              rows={4}
              value={activityData.redThread}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setActivityData({...activityData, redThread: e.target.value})}
            />
          </CardContent>
        </Card>

        {/* Sicherheitsüberlegungen */}
        <Card>
          <CardHeader>
            <CardTitle>Sicherheitsüberlegungen</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Sicherheitshinweise..."
              rows={3}
              value={activityData.safetyNotes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setActivityData({...activityData, safetyNotes: e.target.value})}
            />
          </CardContent>
        </Card>

        {/* Programmabschnitt */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Programmabschnitt</CardTitle>
            <Button variant="outline" size="sm" onClick={addProgramSection}>
              <Plus className="h-4 w-4 mr-1" />
              Hinzufügen
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 pb-2 border-b font-medium text-sm">
                <div className="col-span-2">Zeit</div>
                <div className="col-span-8">Programm</div>
                <div className="col-span-2">Verantwortlich</div>
              </div>

              {/* Rows */}
              {programSections.map((section) => (
                <div key={section.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-2">
                    <Input 
                      type="time"
                      value={section.time}
                      onChange={(e) => updateProgramSection(section.id, 'time', e.target.value)}
                    />
                  </div>
                  <div className="col-span-8">
                    <Textarea 
                      rows={2}
                      value={section.program}
                      onChange={(e: { target: { value: string; }; }) => updateProgramSection(section.id, 'program', e.target.value)}
                      placeholder="Beschreibe den Programmabschnitt..."
                    />
                  </div>
                  <div className="col-span-1">
                    <Input 
                      value={section.responsible}
                      onChange={(e) => updateProgramSection(section.id, 'responsible', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeProgramSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Material */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Material</CardTitle>
            <Button variant="outline" size="sm" onClick={addMaterial}>
              <Plus className="h-4 w-4 mr-1" />
              Hinzufügen
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-2 pb-2 border-b font-medium text-sm">
                <div className="col-span-1">Erledigt</div>
                <div className="col-span-1">Einheit</div>
                <div className="col-span-6">Artikel</div>
                <div className="col-span-3">Verantwortlich</div>
              </div>

              {/* Rows */}
              {materials.map((material) => (
                <div key={material.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1">
                    <input 
                      type="checkbox"
                      checked={material.checked}
                      onChange={(e) => updateMaterial(material.id, 'checked', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="col-span-1">
                    <Input 
                      value={material.unit}
                      onChange={(e) => updateMaterial(material.id, 'unit', e.target.value)}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input 
                      value={material.item}
                      onChange={(e) => updateMaterial(material.id, 'item', e.target.value)}
                      placeholder="z.B. Rauchbombe (+12)"
                    />
                  </div>
                  <div className="col-span-3">
                    <Select 
                      value={material.assignedTo}
                      onValueChange={(value) => updateMaterial(material.id, 'assignedTo', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Stu">Stu</SelectItem>
                        <SelectItem value="Balu">Balu</SelectItem>
                        <SelectItem value="Verkleidung">Verkleidung</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeMaterial(material.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
