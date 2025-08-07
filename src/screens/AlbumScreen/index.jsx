import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../../services/PhotoFetch";
import Card from "../../components/card";
import Loader from "../../components/Loader";
import { db } from "../../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "../../services/firebase";
import "../../i18n";
import { useTranslation } from "react-i18next";

function AlbumScreen() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const { t, i18n } = useTranslation();

  
  useEffect(() => {
 i18n.changeLanguage("ar");
    async function loadPhotos() {
      try {
        const data = await fetchPhotos();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "selectedPhotos", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSelected(data.photos || []);
        }
      } else {
        setSelected([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelect = async (id) => {
    setSelected((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(id);
      const newSelection = isAlreadySelected
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id];

      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "selectedPhotos", user.uid);
        setDoc(userRef, { photos: newSelection });
      }

      return newSelection;
    });
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p>
        {t("Error")}: {error}
      </p>
    );

  return (
    <div className="app-container">
      <h2 className="photo-heading">
        {t("Fetched")} {photos.length} {t("photos")} | {t("Selected")}:{" "}
        {selected.length}
      </h2>
      <div className="photos-grid">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            id={photo.id}
            thumbnailUrl={photo.thumbnailUrl}
            alt={photo.title}
            isSelected={selected.includes(photo.id)}
            onClick={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumScreen;
